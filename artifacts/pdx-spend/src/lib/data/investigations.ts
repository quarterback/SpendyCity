import type { Investigation } from './types';

/**
 * The /investigations beat: long-form structural reads of a single
 * quasi-governmental relationship in Portland or Multnomah County.
 * Where a fund page asks "where did the balance go," an investigation
 * asks "who actually does the work this dollar paid for, and what is
 * legible in the public record about whether the work landed."
 */
export const INVESTIGATIONS: Investigation[] = [
  {
    slug: 'the-contractor-layer',
    number: 1,
    title: 'The contractor layer',
    kicker: 'INVESTIGATION 01',
    oneLineThesis:
      'Multnomah County now spends every Supportive Housing Services dollar Metro collects. The dollar’s path through the contractor layer is mostly invisible, and the outcomes are not what the spend implies.',
    publishedAt: '2026-05-01',
    relatedFundSlugs: ['supportive-housing'],
    cashSeriesTitle: 'Modeled SHS revenue and county spending, FY2021–FY2026',
    cashSeriesSub:
      'Revenue is Metro Supportive Housing Services collections; spending is Multnomah County Homeless Services Department obligations against that revenue. Modeled from Metro and county reporting; figures rounded.',
    cashSeries: [
      { year: 2021, balance: 60_000_000, obligated: 60_000_000, spent: 30_000_000, inflow: 90_000_000 },
      { year: 2022, balance: 110_000_000, obligated: 105_000_000, spent: 70_000_000, inflow: 120_000_000 },
      { year: 2023, balance: 95_000_000, obligated: 130_000_000, spent: 110_000_000, inflow: 125_000_000 },
      { year: 2024, balance: 92_000_000, obligated: 145_000_000, spent: 143_500_000, inflow: 140_400_000 },
      { year: 2025, balance: 60_000_000, obligated: 150_000_000, spent: 152_000_000, inflow: 120_000_000 },
      { year: 2026, balance: 30_000_000, obligated: 145_000_000, spent: 145_000_000, inflow: 115_000_000 }
    ],
    contractorTableTitle: 'Top providers obligated against SHS, FY2024–25 (modeled)',
    contractorTableNote:
      'Obligation figures are modeled from Multnomah County Homeless Services Department program-area totals and the public contracts ledger. “Outcomes public” means the provider publishes a per-program annual outcomes report at a level of detail that lets a reader compute cost per placement or cost per twelve-month retention from public documents.',
    contractorTable: [
      {
        provider: 'Central City Concern',
        obligationUSD: 28_000_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Supportive housing operations + behavioral health',
        outcomesPublic: true,
        note: 'Annual report at program level; most legible in this set.'
      },
      {
        provider: 'Transition Projects',
        obligationUSD: 22_500_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Shelter operations (multiple sites)',
        outcomesPublic: false,
        note: 'Bed-night totals published; placement and retention rates are not.'
      },
      {
        provider: 'JOIN',
        obligationUSD: 9_400_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Outreach + housing retention',
        outcomesPublic: false
      },
      {
        provider: 'Cascadia Health',
        obligationUSD: 11_800_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Behavioral-health-tied supportive housing',
        outcomesPublic: false
      },
      {
        provider: 'Do Good Multnomah',
        obligationUSD: 7_200_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Veteran-targeted shelter + housing',
        outcomesPublic: false
      },
      {
        provider: 'Path Home',
        obligationUSD: 6_400_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Family shelter + rapid rehousing',
        outcomesPublic: true,
        note: 'Family-shelter outcomes are the most legible across the system.'
      },
      {
        provider: 'Human Solutions',
        obligationUSD: 8_900_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'East-county shelter + rent assistance',
        outcomesPublic: false
      },
      {
        provider: 'NARA NW',
        obligationUSD: 5_600_000,
        fiscalYear: 'FY2024-25',
        primaryDeliverable: 'Culturally specific outreach + housing',
        outcomesPublic: false
      }
    ],
    sources: [
      {
        label: 'Multnomah County: Homeless Services Department — Supportive Housing Services',
        url: 'https://hsd.multco.us/shs/'
      },
      {
        label: 'Multnomah County: FY2024 SHS Annual Report',
        url: 'https://hsd.multco.us/2024/11/13/fy2024-shs-annual-report/',
        publishedAt: '2024-11-13'
      },
      {
        label: 'Multnomah County: FY2025 Q1 data',
        url: 'https://hsd.multco.us/2024/11/22/fiscal-year-2025-quarter-one-data/',
        publishedAt: '2024-11-22'
      },
      {
        label: 'Multnomah County: FY2026 State and Federal Budget Rebalance',
        url: 'https://multco.us/info/fy-2026-state-and-federal-budget-rebalance'
      },
      {
        label: 'Multnomah County: Board approves budget modification to partially fill homeless services funding gap',
        url: 'https://multco.us/news/board-approves-budget-modification-partially-fill-homeless-services-funding-gap'
      },
      {
        label: 'KOIN: Portland City commissioners file to end joint homelessness efforts with Multnomah County',
        url: 'https://www.koin.com/local/multnomah-county/portland-city-commissioners-file-to-end-joint-homelessness-efforts-with-multnomah-county/'
      },
      {
        label: 'Willamette Week: New figures show Multnomah County still isn’t using the homeless services tax money Metro covets',
        url: 'https://www.wweek.com/news/2024/02/28/new-figures-show-multnomah-county-still-isnt-using-the-homeless-services-tax-money-metro-covets/',
        publishedAt: '2024-02-28'
      }
    ]
  }
];

export const INVESTIGATION_BY_SLUG: Record<string, Investigation> = Object.fromEntries(
  INVESTIGATIONS.map((i) => [i.slug, i])
);
