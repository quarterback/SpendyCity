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

/**
 * A concrete spending scenario showing what a fund could buy at its current balance.
 * Grounded in published unit costs (city grant scales, bond program assumptions, etc.)
 * and in a defensible reading of the original voter mandate or its statute.
 */
export interface CouldFundItem {
  item: string;           // "Tenant counselors, full-time, four years"
  unitCost: number;       // 65000 (annual loaded)
  units: number;          // 60
  total: number;          // 15600000 (precomputed for display)
  basis: string;          // "City Tier-3 grant salary scale, 2025"
}

/**
 * A named obstacle preventing a fund from spending against its original mandate,
 * along with who controls the lever, the defense usually offered for it,
 * and a one-line counter to that defense.
 */
export interface Blocker {
  name: string;           // "Council can rewrite 'eligible uses' by simple-majority resolution"
  mechanism: string;      // plain-language description of how it works
  controlledBy: string;   // "Portland City Council, four votes"
  defense: string;        // the defense routinely offered
  rebuttal: string;       // one-line counter
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
  /** Plain-language version of voterIntent — two short sentences, no jargon. */
  voterIntentPlain?: string;
  oneLineStatus: string;
  modeledBalance: number;
  modeledRestrictedShare: number;   // 0-1
  modeledMovableShare: number;      // 0-1, fraction reclassified or in flexible reserve
  cumulativeCollected: number;
  collectionsCadence: string;
  scandal: string;                  // single-sentence scandal frame

  // What this money could buy, what's stopping it, what changes if it isn't.
  // Optional only because they are populated via a side-load (proposals.ts);
  // every fund in FUNDS has a corresponding entry.
  couldFund?: CouldFundItem[];
  blockers?: Blocker[];
  ifUnblocked?: string;
  blockerNews?: string;             // current live "creative interpretation" example

  cashSeries: CashPoint[];
  auditEvents: AuditEvent[];
  drift: DriftEntry[];
  promiseVsHappened: PromiseVsHappened[];
  reserveSeries: { year: number; reserve: number }[];
  citations: string[];
  memo: string;                     // pre-generated agent memo (markdown)
}
