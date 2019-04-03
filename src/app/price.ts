export class Legs {
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
   Tradeid: number;
   Client: string;
   Total: number;
   trade: Legs[];
}

export class Greeks {
   Delta: number;
   Gamma: number;
   Theta: number;
   Vega: number;
   Rho: number;
}






