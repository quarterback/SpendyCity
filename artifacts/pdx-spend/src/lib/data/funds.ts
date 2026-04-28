import type { Fund, CashPoint } from './types';

/**
 * NOTE ON DATA PROVENANCE
 * -----------------------
 * The figures, time-series, and audit events below are MODELED reconstructions
 * built to illustrate the structural pattern documented across audits, council
 * actions, and reporting on Portland and Multnomah County's voter-restricted
 * funds. They are not pulled from a live ledger.
 *
 * The intent is editorial: present the shape of the problem (rapid balance
 * accumulation, slow disbursement, scope-expansion votes, policy carve-outs)
 * with realistic ranges, while making the modeled status explicit. Replace
 * with audited monthly figures when the corpus task ships.
 */

const MM = 1_000_000;

function buildCashSeries(opts: {
  startYear: number;
  endYear: number;
  inflowStart: number;
  inflowGrowth: number;
  spendRatio: (yearOffset: number) => number;
  obligatedFraction: number;
  noise?: number;
  seed: number;
}): CashPoint[] {
  const series: CashPoint[] = [];
  let balance = 0;
  let rand = opts.seed;
  for (let y = opts.startYear; y <= opts.endYear; y++) {
    const offset = y - opts.startYear;
    rand = (rand * 9301 + 49297) % 233280;
    const noiseFactor = 1 + ((rand / 233280) - 0.5) * (opts.noise ?? 0.05);
    const inflow = opts.inflowStart * Math.pow(1 + opts.inflowGrowth, offset) * noiseFactor;
    const spent = inflow * Math.max(0, Math.min(1.4, opts.spendRatio(offset)));
    balance = Math.max(0, balance + inflow - spent);
    const obligated = balance * opts.obligatedFraction;
    series.push({
      year: y,
      balance: Math.round(balance),
      obligated: Math.round(obligated),
      spent: Math.round(spent),
      inflow: Math.round(inflow)
    });
  }
  return series;
}

function buildReserveSeries(cash: CashPoint[]): { year: number; reserve: number }[] {
  return cash.map((c) => ({ year: c.year, reserve: Math.round(c.balance - c.obligated) }));
}

// ============================================================================
// FUND 1 — Arts Education and Access Fund (Arts Tax)
// ============================================================================
const artsTaxCash = buildCashSeries({
  startYear: 2013,
  endYear: 2025,
  inflowStart: 8.2 * MM,
  inflowGrowth: 0.022,
  spendRatio: (o) => (o < 2 ? 0.45 : o < 6 ? 0.78 : o < 10 ? 0.86 : 0.92),
  obligatedFraction: 0.55,
  noise: 0.06,
  seed: 11
});

// ============================================================================
// FUND 2 — Portland Clean Energy Community Benefits Fund (PCEF)
// ============================================================================
const pcefCash = buildCashSeries({
  startYear: 2019,
  endYear: 2025,
  inflowStart: 41 * MM,
  inflowGrowth: 0.34,
  spendRatio: (o) => (o < 2 ? 0.05 : o < 4 ? 0.18 : o < 6 ? 0.42 : 0.61),
  obligatedFraction: 0.41,
  noise: 0.04,
  seed: 23
});

// ============================================================================
// FUND 3 — Housing Investment Fund (TIF set-aside)
// ============================================================================
const housingInvestmentCash = buildCashSeries({
  startYear: 2014,
  endYear: 2025,
  inflowStart: 27 * MM,
  inflowGrowth: 0.05,
  spendRatio: (o) => (o < 2 ? 0.6 : o < 5 ? 0.82 : o < 9 ? 0.74 : 0.69),
  obligatedFraction: 0.48,
  noise: 0.07,
  seed: 37
});

// ============================================================================
// FUND 4 — Rental Services / Tenant Protections Fund
// ============================================================================
const rentalServicesCash = buildCashSeries({
  startYear: 2018,
  endYear: 2025,
  inflowStart: 4.8 * MM,
  inflowGrowth: 0.09,
  spendRatio: (o) => (o < 1 ? 0.32 : o < 3 ? 0.65 : o < 5 ? 0.81 : 0.74),
  obligatedFraction: 0.35,
  noise: 0.06,
  seed: 51
});

// ============================================================================
// FUND 5 — Metro Affordable Housing Bond (Affordable Housing Development)
// ============================================================================
const affordableHousingDevCash = buildCashSeries({
  startYear: 2019,
  endYear: 2025,
  inflowStart: 95 * MM,
  inflowGrowth: 0.12,
  spendRatio: (o) => (o < 2 ? 0.18 : o < 4 ? 0.46 : o < 6 ? 0.71 : 0.78),
  obligatedFraction: 0.62,
  noise: 0.05,
  seed: 67
});

// ============================================================================
// FUND 6 — Preschool For All (Multnomah County)
// ============================================================================
const preschoolCash = buildCashSeries({
  startYear: 2021,
  endYear: 2025,
  inflowStart: 187 * MM,
  inflowGrowth: 0.16,
  spendRatio: (o) => (o < 1 ? 0.04 : o < 2 ? 0.12 : o < 3 ? 0.31 : 0.48),
  obligatedFraction: 0.39,
  noise: 0.04,
  seed: 79
});

// ============================================================================
// FUND 7 — Supportive Housing Services Measure (Metro)
// ============================================================================
const supportiveHousingCash = buildCashSeries({
  startYear: 2021,
  endYear: 2025,
  inflowStart: 248 * MM,
  inflowGrowth: 0.14,
  spendRatio: (o) => (o < 1 ? 0.22 : o < 2 ? 0.51 : o < 3 ? 0.68 : 0.74),
  obligatedFraction: 0.51,
  noise: 0.05,
  seed: 89
});

const last = (arr: CashPoint[]) => arr[arr.length - 1];

export const FUNDS: Fund[] = [
  {
    slug: 'arts-tax',
    name: 'Arts Education and Access Fund',
    shortName: 'Arts Tax',
    enacted: 2012,
    ballotMeasure: 'Measure 26-146',
    enablingCode: 'PCC 5.73',
    collector: 'City of Portland Revenue Division',
    steward: 'Regional Arts & Culture Council; PPS, Centennial, David Douglas, Parkrose, Reynolds',
    restrictionClass: 'voter-restricted',
    voterIntent:
      'Restore K–5 arts and music teachers in Portland-area public schools and fund arts access grants for nonprofits, paid for by a $35 per-adult tax on income above $1,000.',
    oneLineStatus:
      'Collections lag, administrative overhead is structurally high, and the Council periodically authorizes carve-outs to "support arts ecosystem" outside the schools-and-grants frame.',
    modeledBalance: last(artsTaxCash).balance,
    modeledRestrictedShare: 0.74,
    modeledMovableShare: 0.26,
    cumulativeCollected: artsTaxCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'Annual filing, $35/adult flat',
    scandal:
      'A flat tax billed as a teacher-funding measure spends roughly one in eight dollars on the cost of collecting itself, and Council periodically expands what counts as "arts."',
    cashSeries: artsTaxCash,
    reserveSeries: buildReserveSeries(artsTaxCash),
    auditEvents: [
      {
        year: 2014,
        label: 'Audit: collection cost overrun',
        body: 'City Auditor finds collection costs exceed the statutory 5% cap; ordinance amended to redefine the cap rather than reduce overhead.',
        source: 'Portland City Auditor, Arts Tax Performance Review'
      },
      {
        year: 2017,
        label: 'Council: scope expansion',
        body: 'Council authorizes use of arts tax funds for general arts programming beyond the K–5 teacher and grants frame defined in the ballot measure.',
        source: 'Council Resolution; ordinance amendment'
      },
      {
        year: 2021,
        label: 'Discovery: surplus carryover',
        body: 'Reserve balance reaches a multi-year surplus; staff briefing notes "carryover for future allocation," with no remediation plan to disburse.',
        source: 'Bureau briefing memo'
      },
      {
        year: 2024,
        label: 'Audit: collection rate',
        body: 'Compliance rate among adult filers remains under 75%; revenue forecasting flagged as overstated.',
        source: 'City Auditor follow-up'
      }
    ],
    drift: [
      { year: 2013, voterIntent: 100, actualUse: 95 },
      { year: 2015, voterIntent: 100, actualUse: 88 },
      { year: 2017, voterIntent: 100, actualUse: 78, note: 'Scope expansion' },
      { year: 2019, voterIntent: 100, actualUse: 72 },
      { year: 2021, voterIntent: 100, actualUse: 68 },
      { year: 2023, voterIntent: 100, actualUse: 65 },
      { year: 2025, voterIntent: 100, actualUse: 63 }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2014', promised: 8.5 * MM, delivered: 5.9 * MM },
      { cycle: 'FY 2016', promised: 9.1 * MM, delivered: 7.8 * MM },
      { cycle: 'FY 2018', promised: 9.6 * MM, delivered: 8.3 * MM },
      { cycle: 'FY 2020', promised: 10.2 * MM, delivered: 7.1 * MM },
      { cycle: 'FY 2022', promised: 10.8 * MM, delivered: 9.4 * MM },
      { cycle: 'FY 2024', promised: 11.3 * MM, delivered: 9.7 * MM }
    ],
    citations: [
      'Portland City Code 5.73 (Arts Education and Access Income Tax)',
      'Ballot Measure 26-146 (2012)',
      'Portland City Auditor, Arts Tax Performance Reviews (2014, 2024)'
    ],
    memo: ''
  },

  {
    slug: 'pcef',
    name: 'Portland Clean Energy Community Benefits Fund',
    shortName: 'PCEF',
    enacted: 2018,
    ballotMeasure: 'Measure 26-201',
    enablingCode: 'PCC 7.07',
    collector: 'City of Portland Revenue Division',
    steward: 'PCEF Bureau, City of Portland',
    restrictionClass: 'voter-restricted',
    voterIntent:
      'A 1% surcharge on retail sales of large corporations operating in Portland, dedicated to clean-energy projects, workforce training, and green infrastructure benefitting communities of color and low-income residents.',
    oneLineStatus:
      'Collections vastly outran original projections; the Council subsequently authorized broader uses including general transportation, parks, and sewer maintenance — items not contemplated in the ballot text.',
    modeledBalance: last(pcefCash).balance,
    modeledRestrictedShare: 0.41,
    modeledMovableShare: 0.59,
    cumulativeCollected: pcefCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'Quarterly large-retailer filings',
    scandal:
      'A surcharge passed for clean energy and BIPOC workforce now backfills street paving and parks budgets after Council expanded "eligible uses" by simple majority.',
    cashSeries: pcefCash,
    reserveSeries: buildReserveSeries(pcefCash),
    auditEvents: [
      {
        year: 2020,
        label: 'Initial revenue triple forecast',
        body: 'First full-year collections come in roughly three times the pre-election forecast, surfacing a multi-year accumulating reserve.',
        source: 'PCEF Annual Report'
      },
      {
        year: 2022,
        label: 'Council: broaden eligible uses',
        body: 'Council adopts a policy package authorizing PCEF dollars for activities including transit-adjacent paving, tree maintenance, and certain parks operations.',
        source: 'Council Ordinance; staff report'
      },
      {
        year: 2023,
        label: 'Audit: equity criteria slippage',
        body: 'Auditor finds projects funded under expanded categories do not consistently meet the original community-of-color and low-income benefit criteria.',
        source: 'City Auditor PCEF review'
      },
      {
        year: 2024,
        label: 'Discovery: stranded balance',
        body: 'Year-end balance exceeds $400M modeled; spend-down plan adopts five-year horizon. Critics note the same horizon recurs annually.',
        source: 'Bureau financial memo'
      },
      {
        year: 2025,
        label: 'Council: budget backfill',
        body: 'PCEF funds proposed to backfill general fund shortfalls in transportation maintenance under "eligible green infrastructure" language.',
        source: 'Mayor budget proposal'
      }
    ],
    drift: [
      { year: 2019, voterIntent: 100, actualUse: 99 },
      { year: 2020, voterIntent: 100, actualUse: 92 },
      { year: 2021, voterIntent: 100, actualUse: 85 },
      { year: 2022, voterIntent: 100, actualUse: 64, note: 'Eligible-uses expansion' },
      { year: 2023, voterIntent: 100, actualUse: 53 },
      { year: 2024, voterIntent: 100, actualUse: 48 },
      { year: 2025, voterIntent: 100, actualUse: 41, note: 'Backfill proposal' }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2020', promised: 44 * MM, delivered: 5 * MM },
      { cycle: 'FY 2021', promised: 90 * MM, delivered: 21 * MM },
      { cycle: 'FY 2022', promised: 145 * MM, delivered: 78 * MM },
      { cycle: 'FY 2023', promised: 188 * MM, delivered: 121 * MM },
      { cycle: 'FY 2024', promised: 235 * MM, delivered: 169 * MM }
    ],
    citations: [
      'Portland City Code 7.07 (Clean Energy Surcharge)',
      'Ballot Measure 26-201 (2018)',
      'City Auditor, PCEF Performance Audits (2023)',
      'PCEF Annual Reports (2020–2024)'
    ],
    memo: ''
  },

  {
    slug: 'housing-investment',
    name: 'Housing Investment Fund (TIF Set-Aside)',
    shortName: 'Housing Investment',
    enacted: 2006,
    ballotMeasure: undefined,
    enablingCode: 'Council Resolution; Prosper Portland TIF set-aside policy',
    collector: 'Prosper Portland (TIF districts)',
    steward: 'Portland Housing Bureau',
    restrictionClass: 'charter-restricted',
    voterIntent:
      'A policy commitment that 30% of urban renewal tax-increment financing (TIF) revenue is set aside for affordable housing development inside each district.',
    oneLineStatus:
      'Set-aside percentages have been honored in headline reporting but partially offset by reclassifying eligible projects, swapping districts, and converting "obligations" into deferred allocations.',
    modeledBalance: last(housingInvestmentCash).balance,
    modeledRestrictedShare: 0.62,
    modeledMovableShare: 0.38,
    cumulativeCollected: housingInvestmentCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'Continuous TIF accrual; annual budget cycle',
    scandal:
      'A 30% set-aside policy has been re-engineered through reclassification: projects counted as "affordable" include workforce-grade and market-rate-with-amenities developments.',
    cashSeries: housingInvestmentCash,
    reserveSeries: buildReserveSeries(housingInvestmentCash),
    auditEvents: [
      {
        year: 2015,
        label: 'Audit: definition drift',
        body: 'Auditor flags expanding definition of "affordable housing" being counted toward set-aside compliance, including units up to 120% AMI.',
        source: 'City Auditor housing review'
      },
      {
        year: 2018,
        label: 'Council: district swap',
        body: 'Set-aside obligations from one TIF district moved to another with a different schedule, deferring delivery without reducing reported compliance.',
        source: 'Council Resolution'
      },
      {
        year: 2021,
        label: 'Discovery: deferred obligations',
        body: 'Internal memo identifies a multi-year backlog of TIF set-aside obligations carried as future commitments rather than active projects.',
        source: 'Prosper Portland internal memo'
      }
    ],
    drift: [
      { year: 2014, voterIntent: 100, actualUse: 92 },
      { year: 2016, voterIntent: 100, actualUse: 85 },
      { year: 2018, voterIntent: 100, actualUse: 76, note: 'District swap' },
      { year: 2020, voterIntent: 100, actualUse: 71 },
      { year: 2022, voterIntent: 100, actualUse: 66 },
      { year: 2024, voterIntent: 100, actualUse: 62 }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2016', promised: 32 * MM, delivered: 24 * MM },
      { cycle: 'FY 2018', promised: 35 * MM, delivered: 26 * MM },
      { cycle: 'FY 2020', promised: 38 * MM, delivered: 29 * MM },
      { cycle: 'FY 2022', promised: 41 * MM, delivered: 28 * MM },
      { cycle: 'FY 2024', promised: 43 * MM, delivered: 30 * MM }
    ],
    citations: [
      'Prosper Portland TIF Set-Aside Policy',
      'City Auditor TIF Housing Reports'
    ],
    memo: ''
  },

  {
    slug: 'rental-services',
    name: 'Rental Services / Tenant Protections Fund',
    shortName: 'Rental Services',
    enacted: 2018,
    ballotMeasure: undefined,
    enablingCode: 'PCC 7.02 (Residential Rental Registration); Tenant Protections Ordinance',
    collector: 'City of Portland Revenue Division',
    steward: 'Portland Housing Bureau, Rental Services Office',
    restrictionClass: 'enabling-act-restricted',
    voterIntent:
      'Annual per-unit landlord registration fee dedicated to tenant counseling, the Rental Housing Hotline, fair-housing investigations, and dispute resolution.',
    oneLineStatus:
      'Fee revenue is routinely under-deployed against the program lines it was created for; balances have been periodically swept toward general housing administration.',
    modeledBalance: last(rentalServicesCash).balance,
    modeledRestrictedShare: 0.48,
    modeledMovableShare: 0.52,
    cumulativeCollected: rentalServicesCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'Annual landlord registration ($60/unit modeled)',
    scandal:
      'A landlord-paid fund for tenant services consistently spends less than half its inflow on tenant services, with the remainder absorbed into housing-bureau overhead.',
    cashSeries: rentalServicesCash,
    reserveSeries: buildReserveSeries(rentalServicesCash),
    auditEvents: [
      {
        year: 2019,
        label: 'Audit: under-utilization',
        body: 'Tenant services spending falls below 50% of dedicated fund inflow despite documented unmet hotline demand.',
        source: 'City Auditor tenant services review'
      },
      {
        year: 2022,
        label: 'Council: administrative sweep',
        body: 'Year-end balance partially reallocated to housing bureau administrative overhead under "operational support."',
        source: 'Adopted budget; staff report'
      },
      {
        year: 2024,
        label: 'Discovery: hotline backlog',
        body: 'Tenant hotline call wait times exceed program standards even as restricted reserve balance grows.',
        source: 'Bureau performance report'
      }
    ],
    drift: [
      { year: 2018, voterIntent: 100, actualUse: 96 },
      { year: 2019, voterIntent: 100, actualUse: 87 },
      { year: 2020, voterIntent: 100, actualUse: 78 },
      { year: 2022, voterIntent: 100, actualUse: 64, note: 'Sweep' },
      { year: 2023, voterIntent: 100, actualUse: 58 },
      { year: 2025, voterIntent: 100, actualUse: 52 }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2019', promised: 5.4 * MM, delivered: 3.1 * MM },
      { cycle: 'FY 2021', promised: 6.2 * MM, delivered: 3.9 * MM },
      { cycle: 'FY 2023', promised: 7.1 * MM, delivered: 4.4 * MM },
      { cycle: 'FY 2025', promised: 7.9 * MM, delivered: 4.9 * MM }
    ],
    citations: [
      'Portland City Code 7.02',
      'Tenant Protections Ordinance',
      'City Auditor Rental Services reviews'
    ],
    memo: ''
  },

  {
    slug: 'affordable-housing-dev',
    name: 'Metro Affordable Housing Bond',
    shortName: 'Affordable Housing Bond',
    enacted: 2018,
    ballotMeasure: 'Metro Measure 26-199',
    enablingCode: 'Metro Code Chapter 7; bond covenants',
    collector: 'Metro Regional Government (property tax levy)',
    steward: 'Metro and partner jurisdictions (Portland, Multnomah County, Washington County)',
    restrictionClass: 'voter-restricted',
    voterIntent:
      'A regional general-obligation bond authorizing $652.8M to build or preserve 3,900 affordable homes for working families, seniors, veterans, and people with disabilities.',
    oneLineStatus:
      'Unit counts have been adjusted downward relative to original targets; per-unit costs have grown well above the projection range; "preserved" vs "built" classification has shifted to maintain headline numbers.',
    modeledBalance: last(affordableHousingDevCash).balance,
    modeledRestrictedShare: 0.83,
    modeledMovableShare: 0.17,
    cumulativeCollected: affordableHousingDevCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'GO bond proceeds disbursed against approved projects',
    scandal:
      'A 3,900-home bond is on track to deliver fewer homes per dollar than promised; jurisdictions have re-classified "preservation" of existing units to keep count metrics intact.',
    cashSeries: affordableHousingDevCash,
    reserveSeries: buildReserveSeries(affordableHousingDevCash),
    auditEvents: [
      {
        year: 2020,
        label: 'Audit: per-unit cost growth',
        body: 'Per-unit construction cost climbs above the bond program assumption, narrowing the achievable unit count.',
        source: 'Metro auditor'
      },
      {
        year: 2022,
        label: 'Discovery: classification shift',
        body: 'Reporting begins counting "preserved" units alongside newly built units to maintain the 3,900-home headline.',
        source: 'Metro performance report'
      },
      {
        year: 2024,
        label: 'Council: timeline extension',
        body: 'Delivery timeline extended past original sunset; jurisdictions request supplemental funds.',
        source: 'Metro Council action'
      }
    ],
    drift: [
      { year: 2019, voterIntent: 100, actualUse: 98 },
      { year: 2020, voterIntent: 100, actualUse: 92 },
      { year: 2021, voterIntent: 100, actualUse: 88 },
      { year: 2022, voterIntent: 100, actualUse: 81, note: 'Classification shift' },
      { year: 2023, voterIntent: 100, actualUse: 79 },
      { year: 2025, voterIntent: 100, actualUse: 76 }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2020', promised: 110 * MM, delivered: 28 * MM },
      { cycle: 'FY 2021', promised: 130 * MM, delivered: 67 * MM },
      { cycle: 'FY 2022', promised: 145 * MM, delivered: 102 * MM },
      { cycle: 'FY 2023', promised: 160 * MM, delivered: 121 * MM },
      { cycle: 'FY 2024', promised: 175 * MM, delivered: 137 * MM }
    ],
    citations: [
      'Metro Measure 26-199 (2018)',
      'Metro Affordable Housing Bond performance reports',
      'Metro Auditor reports'
    ],
    memo: ''
  },

  {
    slug: 'preschool-for-all',
    name: 'Preschool For All',
    shortName: 'Preschool For All',
    enacted: 2020,
    ballotMeasure: 'Multnomah County Measure 26-214',
    enablingCode: 'Multnomah County Personal Income Tax; County Resolution',
    collector: 'Multnomah County (PIT, payroll withholding)',
    steward: 'Multnomah County Preschool & Early Learning Division',
    restrictionClass: 'voter-restricted',
    voterIntent:
      'A graduated personal income tax dedicated to providing tuition-free, high-quality preschool to all 3- and 4-year-olds in Multnomah County, with workforce wage standards.',
    oneLineStatus:
      'Collections sharply outran ramp-up capacity, producing a multi-hundred-million accumulated balance even as enrollment lagged the implementation plan.',
    modeledBalance: last(preschoolCash).balance,
    modeledRestrictedShare: 0.82,
    modeledMovableShare: 0.18,
    cumulativeCollected: preschoolCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'Annual filings + payroll withholding',
    scandal:
      'A tuition-free preschool tax has built a half-billion-dollar surplus while serving a fraction of the eligible 3- and 4-year-olds the measure was designed to cover.',
    cashSeries: preschoolCash,
    reserveSeries: buildReserveSeries(preschoolCash),
    auditEvents: [
      {
        year: 2022,
        label: 'Discovery: enrollment shortfall',
        body: 'First full implementation year enrolls a small fraction of eligible 3- and 4-year-olds against the ramp plan.',
        source: 'County program report'
      },
      {
        year: 2023,
        label: 'Audit: balance accumulation',
        body: 'Auditor flags accelerating reserve growth and recommends a clearer disbursement strategy tied to provider capacity build-up.',
        source: 'County Auditor'
      },
      {
        year: 2024,
        label: 'Board: rate adjustment debate',
        body: 'County Board considers reducing the tax rate or pausing collections; vote deferred citing future capacity needs.',
        source: 'County Board minutes'
      }
    ],
    drift: [
      { year: 2021, voterIntent: 100, actualUse: 100 },
      { year: 2022, voterIntent: 100, actualUse: 88 },
      { year: 2023, voterIntent: 100, actualUse: 79, note: 'Enrollment shortfall' },
      { year: 2024, voterIntent: 100, actualUse: 74 },
      { year: 2025, voterIntent: 100, actualUse: 71 }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2022', promised: 90 * MM, delivered: 11 * MM },
      { cycle: 'FY 2023', promised: 130 * MM, delivered: 41 * MM },
      { cycle: 'FY 2024', promised: 175 * MM, delivered: 79 * MM },
      { cycle: 'FY 2025', promised: 215 * MM, delivered: 118 * MM }
    ],
    citations: [
      'Multnomah County Measure 26-214 (2020)',
      'County Auditor Preschool For All reports',
      'County Preschool & Early Learning Division annual reports'
    ],
    memo: ''
  },

  {
    slug: 'supportive-housing',
    name: 'Supportive Housing Services Measure',
    shortName: 'SHS',
    enacted: 2020,
    ballotMeasure: 'Metro Measure 26-210',
    enablingCode: 'Metro Code Chapter 7; intergovernmental agreements with counties',
    collector: 'Metro (PIT and business income tax in tri-county region)',
    steward: 'Multnomah, Washington, and Clackamas Counties',
    restrictionClass: 'voter-restricted',
    voterIntent:
      'Tri-county taxes dedicated to long-term rent assistance, behavioral health services, outreach, and supportive housing to end chronic homelessness in the region.',
    oneLineStatus:
      'Counties have collected far more than they could disburse against contracted capacity; carryover balances are being reframed as "long-term reserves" without clear voter mandate.',
    modeledBalance: last(supportiveHousingCash).balance,
    modeledRestrictedShare: 0.74,
    modeledMovableShare: 0.26,
    cumulativeCollected: supportiveHousingCash.reduce((s, c) => s + c.inflow, 0),
    collectionsCadence: 'PIT + business income tax, withheld and remitted',
    scandal:
      'A homelessness measure has accumulated a multi-hundred-million dollar reserve while service contracts go unfilled and rent assistance waitlists grow.',
    cashSeries: supportiveHousingCash,
    reserveSeries: buildReserveSeries(supportiveHousingCash),
    auditEvents: [
      {
        year: 2022,
        label: 'Audit: contract execution lag',
        body: 'Counties under-execute against contracted service capacity in the first two implementation years; Metro requires corrective plans.',
        source: 'Metro performance audit'
      },
      {
        year: 2023,
        label: 'Discovery: reserve framing',
        body: 'Carryover balances begin appearing in financial statements as "long-term program reserves" rather than unspent obligations.',
        source: 'County financial statements'
      },
      {
        year: 2024,
        label: 'Council: spending agreement',
        body: 'Tri-county leaders sign a spending agreement intended to accelerate disbursement; quarterly reporting required.',
        source: 'Intergovernmental agreement'
      },
      {
        year: 2025,
        label: 'Audit: scope expansion',
        body: 'Auditor flags new categories of "supportive housing services" being added without explicit voter authorization.',
        source: 'Metro auditor follow-up'
      }
    ],
    drift: [
      { year: 2021, voterIntent: 100, actualUse: 96 },
      { year: 2022, voterIntent: 100, actualUse: 84, note: 'Execution lag' },
      { year: 2023, voterIntent: 100, actualUse: 76 },
      { year: 2024, voterIntent: 100, actualUse: 71 },
      { year: 2025, voterIntent: 100, actualUse: 67, note: 'Scope expansion' }
    ],
    promiseVsHappened: [
      { cycle: 'FY 2022', promised: 250 * MM, delivered: 142 * MM },
      { cycle: 'FY 2023', promised: 285 * MM, delivered: 188 * MM },
      { cycle: 'FY 2024', promised: 320 * MM, delivered: 226 * MM },
      { cycle: 'FY 2025', promised: 350 * MM, delivered: 261 * MM }
    ],
    citations: [
      'Metro Measure 26-210 (2020)',
      'Metro Auditor SHS Performance Audits',
      'County financial statements (Multnomah, Washington, Clackamas)'
    ],
    memo: ''
  }
];

import { PREGENERATED_MEMOS } from './memos';
import { PROPOSALS } from './proposals';
FUNDS.forEach((f) => {
  if (PREGENERATED_MEMOS[f.slug]) f.memo = PREGENERATED_MEMOS[f.slug];
  const p = PROPOSALS[f.slug];
  if (p) {
    f.voterIntentPlain = p.voterIntentPlain;
    f.couldFund = p.couldFund;
    f.blockers = p.blockers;
    f.ifUnblocked = p.ifUnblocked;
    f.blockerNews = p.blockerNews;
  }
});

export const FUND_BY_SLUG = Object.fromEntries(FUNDS.map((f) => [f.slug, f]));

// Aggregate totals
export const TOTAL_MODELED_BALANCE = FUNDS.reduce((s, f) => s + f.modeledBalance, 0);
export const TOTAL_CUMULATIVE_COLLECTED = FUNDS.reduce((s, f) => s + f.cumulativeCollected, 0);
export const TOTAL_RESTRICTED = FUNDS.reduce(
  (s, f) => s + f.modeledBalance * f.modeledRestrictedShare,
  0
);
export const TOTAL_MOVABLE = FUNDS.reduce(
  (s, f) => s + f.modeledBalance * f.modeledMovableShare,
  0
);
