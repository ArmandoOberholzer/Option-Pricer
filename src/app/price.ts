export class PriceInputs {
   strike: number;
   spot: number;
   rate: number;
   vol: number;
   time: number;
   divYield: number;
   price: number;
   type: string;
}

export class TradeSummary{
   Client: string;
   Total: number;
   trade: PriceInputs[];
}

export class GoalSeek {
   GoalVar: string;
   answer: number;
}

export class Greeks {
   Delta: number;
   Gamma: number;
   Theta: number;
   Vega: number;
   Rho: number;
}

export class History {
   Tradeid: number;
   client: string;
   Call_or_Put: string;
   begin_date: string;
   Expiry_date: string;
   days_to_expiry: number;
   strike: number;
   spot: number;
   dividend_yield: number;
   volatility: number;
   risk_free: number;
   premium: number;
   status: string;
}

export class TradeHist {
   Tradeid: number;
   Tradeinfo: TradeSummary[];

}


