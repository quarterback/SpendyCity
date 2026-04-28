export type RestrictionClass =
  | 'voter-restricted'
  | 'charter-restricted'
  | 'enabling-act-restricted'
  | 'discretionary';

export interface CashPoint {
  year: number;
  balance: number;        // year-end cash position, USD
  obligated: number;      // committed but not spent
  spent: number;          // outflow for that year
  inflow: number;         // revenue collected that year
}

export interface AuditEvent {
  year: number;
  month?: number;
  label: string;
  body: string;
  source?: string;
}

export interface DriftEntry {
  year: number;
  voterIntent: number;    // 0-100, how on-mission
  actualUse: number;      // 0-100, how on-mission in practice
  note?: string;
}

export interface PromiseVsHappened {
  cycle: string;          // e.g. "FY 2021"
  promised: number;       // dollars promised in plan
  delivered: number;      // dollars delivered against plan
}

export interface Fund {
  slug: string;
  name: string;
  shortName: string;
  enacted: number;
  ballotMeasure?: string;
  enablingCode: string;
  collector: string;
  steward: string;
  restrictionClass: RestrictionClass;
  voterIntent: string;
  oneLineStatus: string;
  modeledBalance: number;
  modeledRestrictedShare: number;   // 0-1
  modeledMovableShare: number;      // 0-1, fraction reclassified or in flexible reserve
  cumulativeCollected: number;
  collectionsCadence: string;
  scandal: string;                  // single-sentence scandal frame
  cashSeries: CashPoint[];
  auditEvents: AuditEvent[];
  drift: DriftEntry[];
  promiseVsHappened: PromiseVsHappened[];
  reserveSeries: { year: number; reserve: number }[];
  citations: string[];
  memo: string;                     // pre-generated agent memo (markdown)
}
