from flask import Flask
from flask import request
from scipy.stats import norm
import json
import math
import scipy.optimize as op
from flask_cors import CORS, cross_origin
import sqlite3
from sqlite3 import Error

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class PricerResult:
  def __init__(self,d1,d2,price):
    self.d1 = d1
    self.d2 = d2
    self.price = price



@app.route("/", methods=['PUT'])
@cross_origin()
def calcoptionvalue():
    JSONdata = json.loads(request.data.decode())
    data = JSONdata['trade']
    print(JSONdata)
    print(data)

    d1 = ((math.log(float(data['spot'])/float(data['strike'])))+((float(data['rate'])/100 + ((float(data['vol'])/100**2)/2))*float(data['time'])))/(float(data['vol'])/100*math.sqrt(float(data['time'])))
    d2 = d1 - (float(data['vol'])/100*math.sqrt(float(data['time'])))
    price = (float(data['spot'])*norm.cdf(d1)) - norm.cdf(d2)*float(data['strike'])*math.exp(-float(data['rate'])/100/100*float(data['time']))
    return json.dumps( PricerResult(d1,d2,price).__dict__ ) 
  # OF   return json.dumps({ 'd1':d1,'d2':d2,'price':price}) sonder die class


@app.route("/GoalSeek", methods=['PUT'])
@cross_origin()
def GoalSeek():
  def BlackScholes(type,strike,spot,rate,vol,time,divYield,price):
       
        d1 = ((math.log(spot/strike))+((rate - divYield + ((vol*vol)/2))*time))/(vol*math.sqrt(time))
        d2 = d1 - (vol*math.sqrt(time))
        if type == 'c':
          return spot*math.exp(-time*divYield)*norm.cdf(d1) - norm.cdf(d2)*strike*math.exp(-rate*time) - price
        elif type == 'p':
          return  norm.cdf(-d2)*strike*math.exp(-rate*time) - spot*math.exp(-time*divYield)*norm.cdf(-d1) - price

  JSONdata = json.loads(request.data.decode())
  print(len(JSONdata['trade']))
  for i in range(len(JSONdata['trade'])):
    data = JSONdata['trade'][i]
    NullCount = 0
    for x in ['spot','strike','rate','time','vol','price']:
      if (data[x] is None):
        NullCount+=1

    print(data)
    print(JSONdata)
    print("Print****************************************************************************************************************************************************************************************")
    if (NullCount <= 1):
    # calculations for call option
      if data['spot'] is None: 
        print('spot') 
        
        solution = op.root(lambda spot: BlackScholes(data['type'],float(data['strike']),spot, float(data['rate']), float(data['vol']),float(data['time']),float(data['divYield']),float(data['price'])), 0.0)
        data['spot']  = solution.x[0]
      

      elif data['strike'] is None:
        print('strike') 
        solution =  op.root(lambda strike: BlackScholes(data['type'],strike,float(data['spot']), float(data['rate']), float(data['vol']),float(data['time']),float(data['divYield']),float(data['price'])), 0.0)
        data['strike'] = solution.x[0]
        

      elif data['rate'] is None: 
        print('rate') 
        solution  = op.root(lambda rate: BlackScholes(data['type'],float(data['strike']),float(data['spot']), rate, float(data['vol']),float(data['time']),float(data['divYield']),float(data['price'])), 0.0)
        data['rate'] = solution.x[0]
        
      elif data['time'] is None: 
        print('time') 
        solution = op.root(lambda time: BlackScholes(data['type'],float(data['strike']),float(data['spot']), float(data['rate']), float(data['vol']),time,float(data['divYield']),float(data['price'])), 0.0)
        data['time'] = solution.x[0]
      

      elif data['vol'] is None: 
        print('vol') 
        solution = op.root(lambda vol: BlackScholes(data['type'],float(data['strike']),float(data['spot']), float(data['rate']), vol,float(data['time']),float(data['divYield']),float(data['price'])), 0.0)
        data['vol'] =solution.x[0] 

      elif data['divYield'] is None: 
        print('divYield') 
        solution = op.root(lambda divYield: BlackScholes(data['type'],float(data['strike']),float(data['spot']), float(data['rate']), float(data['vol']),float(data['time']),divYield,float(data['price'])), 0.0)
        data['divYield'] =solution.x[0]

      else:
        d1 = ((math.log(float(data['spot'])/float(data['strike'])))+((float(data['rate']) - float(data['divYield']) + ((float(data['vol'])**2)/2))*float(data['time'])))/(float(data['vol'])*math.sqrt(float(data['time'])))
        d2 = d1 - (float(data['vol'])*math.sqrt(float(data['time'])))
        if data['type'] == 'c':
          data['price'] = (float(data['spot'])*math.exp(-float(data['time'])*float(data['divYield']))*norm.cdf(d1)) - norm.cdf(d2)*float(data['strike'])*math.exp(-float(data['rate'])*float(data['time']))
        elif data['type'] == 'p':
          data['price'] = norm.cdf(-d2)*float(data['strike'])*math.exp(-float(data['rate'])*float(data['time'])) - (float(data['spot'])*math.exp(-float(data['time'])*float(data['divYield']))*norm.cdf(-d1)) 
    
  print(data)
  print(JSONdata)
  print(json.dumps(JSONdata))
  return json.dumps(JSONdata)
#====================================================================

# @app.route("/Greeks", methods=['PUT'])
# @cross_origin()

# def Greeks():
#   data = json.loads(request.data.decode())
#   print(data)
#   d1 = ((math.log(float(data['spot'])/float(data['strike'])))+((float(data['rate'])/100 - float(data['divYield'])/100 + ((float(data['vol'])/100**2)/2))*float(data['time'])))/(float(data['vol'])/100*math.sqrt(float(data['time'])))
#   d2 = d1 - (float(data['vol'])/100*math.sqrt(float(data['time'])))

#   if data['type'] == 'c'
    
#     Delta = math.exp(-data['time']*data['divYield'])*norm.cdf(d1)
#     Gamma = (math.exp(-data['time']*data['divYield'])/data['spot']*data['vol']*sqrt(data['time']))*(1/sqrt(2*math.pi))*(math.exp(-(d1**2)/2))
#     Theta = -(stock * norm.pdf(d1) * sigma / (2 * sqrt(time))) - (risk_free_rate * strike * exp(-risk_free_rate*time) * norm.cdf(d2))
#     Vega =
#     Rho =

# Put: strike*math.exp(-rate*time)*norm.cdf(-d2) - spot*math.exp(-time*dividend)*norm.cdf(-d1) 

#     Delta = math.exp(-time*dividend)*(norm.cdf(d1)-1)
#     Gamma = 
#     Theta =
#     Vega =
#     Rho =
#==================================================================================
#==================================================================================
#Get All
@app.route("/DatabaseGetHistory", methods=['PUT','GET','POST'])
@cross_origin()

def select_all_History():

  database = "C:\sqlite\db\OptionHistory.db"
  conn = sqlite3.connect(database)
  with conn:
      cur = conn.cursor()
      cur.execute("SELECT Tradeid,Client FROM History")
      rows = cur.fetchall()
      print(rows)
      hist = []
      for row in rows:
         hist.append({'Tradeid': row[0],'Client': row[1], 'TradeLegs':[]})
  print("*********************************************************************************")
  print((hist))
  return json.dumps(hist)
 
  #==================================================================================
  #Add die Trade
@app.route("/DatabaseAddTrade", methods=['PUT','GET','POST'])
@cross_origin()

def Add_Trade():
  data = json.loads(request.data.decode())
  print(data)
  print(data['trade'])
  print( '//////////////////////////////////////////////////////////////////////////' )
  database = "C:\sqlite\db\OptionHistory.db"
  conn = sqlite3.connect(database)
  with conn:
      sql = ''' INSERT INTO History(Client, Tradeinfo, Legs)
                            VALUES(?,?,?)''' 
      cur = conn.cursor()
      cur.execute(sql, (data['Client'],json.dumps(data),json.dumps(data['trade'])))
  return ("")
   

  #==================================================================================
  #Get Een
@app.route("/DatabaseGetTrade", methods=['PUT','GET','POST'])
@cross_origin()

def getTrade():
  database = "C:\sqlite\db\OptionHistory.db"
  conn = sqlite3.connect(database)
  id = float(request.args.get('id'))
  with conn:
    sql = 'SELECT Tradeinfo FROM History WHERE Tradeid=?'
    cur = conn.cursor()
    cur.execute(sql, (id,))
    tradeinfo = cur.fetchall()
    print(tradeinfo)
    print('**-------*****')
  return (tradeinfo[0][0])

  #==================================================================================
  #Get Een
@app.route("/DatabaseGetTradeLegs", methods=['PUT','GET','POST'])
@cross_origin()

def getTradeLegs():
  database = "C:\sqlite\db\OptionHistory.db"
  conn = sqlite3.connect(database)
  id = float(request.args.get('id'))
  with conn:
    sql = 'SELECT Legs FROM History WHERE Tradeid=?'
    cur = conn.cursor()
    cur.execute(sql, (id,))
    tradeinfo = cur.fetchall()
    print(tradeinfo[0][0])
  return (tradeinfo[0][0])
    
# #==========================================================================================
    
# #==========================================================================================
