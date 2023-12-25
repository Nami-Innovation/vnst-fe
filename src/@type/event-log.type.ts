export interface EventLog {
  readonly _id: string;
  readonly event: string;
  readonly logIndex?: number;
  readonly transactionIndex?: number;
  readonly transactionHash: string;
  readonly blockHash: string;
  readonly blockNumber: number;
  readonly address: string;
  readonly returnValues: Record<string, unknown>;
}

export enum EventName {
  MINT = 'EMint',
  REDEEM = 'ERedeem',
  TRANSFER = 'Transfer',
}
