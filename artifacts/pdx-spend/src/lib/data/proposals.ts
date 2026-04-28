/**
 * "Could fund / what's blocking it / if unblocked" data, keyed by fund slug.
 *
 * NOTE ON CONSTRUCTION
 * --------------------
 * The unit costs and counts are grounded in published references — city grant
 * scales, bond program assumptions, BPS retrofit costs, federal grant per-unit
 * figures, NABCEP training tuition. The scenario set is the result of reading
 * each fund's enabling statute the same way bureaus read it when expanding
 * eligible uses, and pointing the resulting elasticity at the original voter
 * mandate instead of away from it.
 *
 * The "blocker" lines are mechanism-level, not personality-level. The defenses
 * paraphrase positions actually published in audit responses, council minutes,
 * and bureau reports. The rebuttals are the site's editorial position.
 */

import type { CouldFundItem, Blocker } from './types';

export interface ProposalSet {
  voterIntentPlain: string;
  couldFund: CouldFundItem[];
  blockers: Blocker[];
  ifUnblocked: string;
  blockerNews?: string;
}

const cf = (item: string, units: number, unitCost: number, basis: string): CouldFundItem => ({
  item,
  units,
  unitCost,
  total: Math.round(units * unitCost),
  basis
});

export const PROPOSALS: Record<string, ProposalSet> = {
  // ──────────────────────────────────────────────────────────────────────────
  'arts-tax': {
    voterIntentPlain:
      'You voted for two things in 2012. Pay K–5 art and music teachers in Portland-area schools. Fund grants so nonprofits can bring arts to kids who would not get them otherwise.',
    couldFund: [
      cf('K–5 art and music teachers, full-time, 5 years', 220, 84_000, 'PPS Tier-3 teacher loaded salary, 2025'),
      cf('Student arts intensive scholarships', 14_000, 1_650, 'RACC Arts for All published rate'),
      cf('K–5 instruments and maintenance', 12_000, 460, 'PPS music program procurement'),
      cf('Bilingual arts education across all 5 districts, 5 years', 1, 12_000_000, '$2.4M per year, 5-district pilot scale')
    ],
    blockers: [
      {
        name: 'The 5% overhead cap was rewritten instead of enforced',
        mechanism:
          'The 2012 ballot capped collection costs at 5% of revenue. When costs went over, Council redefined what counts as "collection cost" instead of cutting it.',
        controlledBy: 'Portland City Council, four votes',
        defense:
          'Collection costs are necessarily higher for a flat tax with a broad filer base. The cap as written was unworkable.',
        rebuttal:
          'King County\'s per-capita arts tax hits the same compliance at under 4% overhead. The cost is a choice, not a constraint.'
      },
      {
        name: 'No floor on the teacher line',
        mechanism:
          'The ordinance does not require any minimum share of revenue to go to K–5 teacher salaries. Teacher dollars compete with grant dollars and overhead each year.',
        controlledBy: 'Portland City Council, four votes',
        defense:
          'Annual flexibility lets the fund respond to changing arts ecosystem needs.',
        rebuttal:
          'The ballot text named two uses. A floor on the larger one would honor what voters passed.'
      }
    ],
    ifUnblocked:
      'Cap overhead at 5% and put a floor on the teacher line. Within two years a music or art teacher returns to every K–5 school in PPS, Centennial, David Douglas, Parkrose, and Reynolds.',
    blockerNews:
      'The City Auditor\'s 2024 follow-up found compliance still under 75% and overhead unchanged. Council has not taken action on either finding.'
  },

  // ──────────────────────────────────────────────────────────────────────────
  pcef: {
    voterIntentPlain:
      'You voted in 2018 to make big retailers pay 1% of their Portland sales into a clean-energy, green-jobs, and weatherization fund. The fund was built to benefit communities of color and low-income residents first.',
    couldFund: [
      cf('Home weatherization retrofits for low-income households', 12_000, 32_000, 'BPS published retrofit cost, 2024'),
      cf('BIPOC clean-energy career training (NABCEP Tier-1) over 5 years', 800, 48_000, 'NABCEP tuition + stipend + placement'),
      cf('Community microgrids in East Portland neighborhoods', 6, 14_000_000, 'BPA / EnergyTrust microgrid pilot scale'),
      cf('Heat-pump replacements for low-income homes', 4_200, 38_000, 'EnergyTrust HVAC program installed cost'),
      cf('Cool roofs across every K–5 school in the 5 east-side districts', 2_400_000, 4.20, 'Cool Roof Coalition $4.20/sqft, 2.4M sqft scoped')
    ],
    blockers: [
      {
        name: 'Council can rewrite "eligible uses" with a simple-majority vote',
        mechanism:
          'PCC 7.07 lets Council redefine what counts as a "clean energy project" through a normal Council vote. There is no return to voters.',
        controlledBy: 'Portland City Council, four votes',
        defense:
          'Flexibility is needed to respond to changing climate priorities and align with city budget realities.',
        rebuttal:
          'The ballot text named retrofits, training, and BIPOC workforce. LED lighting at a private arena is general municipal capital, not a climate priority.'
      },
      {
        name: 'No minimum-deployment ratio in the ordinance',
        mechanism:
          'Nothing requires PCEF to spend a fixed share of inflow each year on the original program lines. Surplus accumulates indefinitely.',
        controlledBy: 'Portland City Council, four votes',
        defense:
          'Multi-year planning produces better projects than spend-it-or-lose-it cycles.',
        rebuttal:
          'Six years of collections have not produced an actual five-year deployment plan. The argument has not produced the plan.'
      },
      {
        name: 'Grants reported as "awarded," not as delivered',
        mechanism:
          'PCEF reports grants on the date Council approves them, not on the date the work happens. Awarded does not equal weatherized, trained, or installed.',
        controlledBy: 'PCEF Bureau reporting practice; Council can require quarterly reconciliation',
        defense:
          'Awards represent commitment. Reporting on completion would be misleading because projects span years.',
        rebuttal:
          'Federal grants do quarterly completion reporting routinely. There is no technical reason it can\'t be done here.'
      }
    ],
    ifUnblocked:
      'Restore the original mandate. Within five years PCEF puts 800 Portlanders into clean-energy careers and weatherizes roughly one in eight low-income homes in the city.',
    blockerNews:
      'In April 2026, PCEF dollars were proposed to fund LED lighting, HVAC upgrades, and concourse renovations at the privately-operated Moda Center under "eligible green infrastructure" language. The arena\'s operating cost goes down. The original BIPOC workforce mandate goes unfunded.'
  },

  // ──────────────────────────────────────────────────────────────────────────
  'housing-investment': {
    voterIntentPlain:
      'A 2006 city policy says 30 cents of every urban-renewal dollar must go to building affordable housing inside the same neighborhood that generated it. The set-aside is supposed to be honored district by district.',
    couldFund: [
      cf('Deeply-affordable units at 60% AMI', 320, 375_000, 'Bond program blended unit cost, 2024'),
      cf('Land trust acquisitions to lock long-term affordability', 1_400, 84_000, 'PHB land trust acquisition average'),
      cf('Home-repair grants for low-income owners (anti-displacement)', 3_000, 40_000, 'PHB home-repair grant ceiling')
    ],
    blockers: [
      {
        name: 'The definition of "affordable" was widened to 120% AMI',
        mechanism:
          'Workforce-grade and amenity-rich units now count toward the set-aside. The headline 30% holds. The depth of affordability has dropped.',
        controlledBy: 'Portland Housing Bureau policy; Council ratification',
        defense:
          'Workforce housing serves essential workers near opportunity and is a recognized HUD category.',
        rebuttal:
          '120% AMI in the PPS catchment is over $135,000 a year. Voters approved affordable. Anything else is policy invention.'
      },
      {
        name: 'Cross-district swaps defer obligations to future years',
        mechanism:
          'Set-aside obligations from one TIF district can be moved to another with a different schedule. Reported compliance stays high while delivery slips.',
        controlledBy: 'Council resolution, by simple majority',
        defense:
          'Cross-district transfers let dollars follow market readiness.',
        rebuttal:
          'Prosper Portland\'s own 2021 memo names a multi-year backlog. Transfers compounded the deferral.'
      }
    ],
    ifUnblocked:
      'Pull the definition back to 80% AMI and require district-level delivery, and the existing backlog clears as roughly 1,200 deeply-affordable units within four years.',
    blockerNews:
      'The 2018 district-swap resolution remains in force. The original obligations have not been reattached to their original districts.'
  },

  // ──────────────────────────────────────────────────────────────────────────
  'rental-services': {
    voterIntentPlain:
      'Landlords pay an annual fee for every unit they rent in Portland. The money is supposed to go to tenant counseling, the Rental Housing Hotline, fair-housing investigations, and dispute resolution. It pays for help when something goes wrong with your landlord.',
    couldFund: [
      cf('Full-time tenant counselors for 4 years', 60, 65_000, 'City Tier-3 grant scale loaded, 2025'),
      cf('Doubling of Rental Housing Hotline staffing for 5 years', 1, 9_000_000, '$1.8M/year, 5 years, current staffing baseline'),
      cf('Fair-housing investigations', 12_000, 1_300, 'Fair Housing Council average per-case cost'),
      cf('Rapid-rehousing payments for displacement-risk households', 2_400, 5_000, 'JOHS rapid-rehousing per-household average')
    ],
    blockers: [
      {
        name: 'Year-end balance can be swept to housing-bureau overhead',
        mechanism:
          'The adopted budget can reallocate any unspent rental-services balance to the Housing Bureau\'s general overhead under "operational support."',
        controlledBy: 'Portland City Council, in adopted budget',
        defense:
          'Operational support is necessary for service-delivery infrastructure.',
        rebuttal:
          'Bureau overhead is funded by general appropriation. Sweeping a fee paid by landlords for tenant services bypasses what the program was created for.'
      },
      {
        name: 'No floor on tenant-services spending',
        mechanism:
          'There is no rule requiring a minimum share of inflow each year to actually reach the program lines the fee is collected for.',
        controlledBy: 'Council ordinance amendment',
        defense:
          'Conservative spending ensures a multi-year reserve for crisis response.',
        rebuttal:
          'Hotline wait times exceed the program\'s own service standards while the reserve grows. The crisis is now.'
      }
    ],
    ifUnblocked:
      'Stop the sweeps and put a floor on the counselor line, and the current hotline backlog clears within a year. Tenants in trouble get a callback the same week.',
    blockerNews:
      'The FY 2022 budget reallocated the year-end balance to bureau overhead. The audit recommendation to set a tenant-services floor has not been implemented.'
  },

  // ──────────────────────────────────────────────────────────────────────────
  'affordable-housing-dev': {
    voterIntentPlain:
      'In 2018, voters across three counties approved a $652.8M bond. The promise: build or preserve 3,900 affordable homes for working families, seniors, veterans, and people with disabilities.',
    couldFund: [
      cf('Newly-built affordable units at corrected unit cost', 1_060, 410_000, 'Metro bond program 2024 unit cost'),
      cf('Preservation of existing affordable units', 1_100, 165_000, 'Metro preservation program per-unit'),
      cf('Site acquisition for the next round of units', 3_790, 115_000, 'Metro land acquisition program average')
    ],
    blockers: [
      {
        name: 'Cost growth was absorbed by lowering the unit count',
        mechanism:
          'When per-unit construction costs outran the bond assumption, jurisdictions kept the dollar total fixed and reduced the home count. Voters approved a unit count.',
        controlledBy: 'Metro Council and partner-jurisdiction bureaus',
        defense:
          'Construction inflation is outside Metro\'s control.',
        rebuttal:
          'Yet Metro chose to absorb cost growth by lowering targets rather than supplementing the bond. Voters approved 3,900 homes, not $652.8M.'
      },
      {
        name: '"Preserved" units count toward the 3,900-home headline',
        mechanism:
          'The mix between newly built and preserved units has shifted toward preservation while the headline number stays the same. The two are not equivalent.',
        controlledBy: 'Metro reporting practice; jurisdiction project selection',
        defense:
          'Preservation prevents displacement and is counted by HUD as a housing strategy.',
        rebuttal:
          'The ballot title said build or preserve. The bureau choices have shifted the mix away from build without returning to voters.'
      }
    ],
    ifUnblocked:
      'A supplemental bond and a binding split between built and preserved would land 3,900 homes within the original schedule plus two years.',
    blockerNews:
      'A 2024 Metro action extended the delivery window past the original sunset. Counts have not been re-baselined to the original built-versus-preserved split.'
  },

  // ──────────────────────────────────────────────────────────────────────────
  'preschool-for-all': {
    voterIntentPlain:
      'In 2020, Multnomah County voters approved a high-income tax with three jobs. Give every 3- and 4-year-old a tuition-free preschool spot. Pay teachers a living wage. Build provider capacity.',
    couldFund: [
      cf('Tuition-free preschool seats over 5 years (full ramp)', 11_200, 14_000, 'County provider rate, modeled blended'),
      cf('Workforce wage uplift to a $28/hr floor for early educators', 1_400, 38_000, '$28/hr × 1,950 hr × 4 yr — wage delta only'),
      cf('New provider classrooms', 380, 145_000, 'County classroom buildout average')
    ],
    blockers: [
      {
        name: 'No published binding ramp schedule',
        mechanism:
          'The county controls the enrollment ramp internally. There is no public, binding multi-year schedule that providers and parents can plan against.',
        controlledBy: 'Multnomah County Preschool & Early Learning Division',
        defense:
          'Provider capacity must build before enrollment can scale; rushing risks quality.',
        rebuttal:
          'Other counties have ramped at twice this pace using the same workforce dollars. The slow ramp is a choice, not a constraint.'
      },
      {
        name: 'Surplus is framed as "future capacity reserve" with no spend trigger',
        mechanism:
          'Year-end balances are reported as reserves rather than as undeployed capacity. There is no rule forcing a spend-down once the reserve passes a multiple of annual operating cost.',
        controlledBy: 'County Board of Commissioners',
        defense:
          'Reserves protect against tax-rate volatility.',
        rebuttal:
          'A reserve at one year of operations would be defensible. The current modeled reserve is over three.'
      }
    ],
    ifUnblocked:
      'Publish a binding 5-year ramp with quarterly enrollment reports, and 11,200 children get seats while 1,400 educators move to the wage floor.',
    blockerNews:
      'In 2024 the County Board deferred a vote on adjusting the tax rate while enrollment continued to lag. The reserve framing was preserved.'
  },

  // ──────────────────────────────────────────────────────────────────────────
  'supportive-housing': {
    voterIntentPlain:
      'In 2020, tri-county voters approved taxes dedicated to ending chronic homelessness. Four eligible uses: long-term rent help, behavioral-health services, outreach, and permanent supportive housing.',
    couldFund: [
      cf('Long-term rent-assistance vouchers for 3 years', 12_000, 50_400, '$1,400/mo × 36 months'),
      cf('Newly-built supportive-housing units (capital + 5-yr operating)', 1_300, 480_000, 'JOHS supportive housing unit cost'),
      cf('Assertive Community Treatment teams (96 teams, 1 year)', 96, 2_100_000, 'ACT model annual cost per team'),
      cf('Outreach workers loaded for 4 years', 240, 384_000, '$96k loaded × 4 yr')
    ],
    blockers: [
      {
        name: 'Counties under-execute against contracted service capacity',
        mechanism:
          'Year-by-year contracts repel providers; multi-year contracts (which counties have authority to sign) would attract them. The contract structure is the binding constraint, not dollars.',
        controlledBy: 'County procurement and contracting offices',
        defense:
          'Provider capacity is the binding constraint, not dollars.',
        rebuttal:
          'Multi-year provider funding agreements would attract capacity. Year-by-year contracts repel it. The constraint is procurement, not the market.'
      },
      {
        name: '"Long-term program reserves" framing protects unspent money from disbursement',
        mechanism:
          'Carryover balances are reported in financial statements as long-term reserves rather than as obligations behind on delivery. The framing slows the disbursement clock.',
        controlledBy: 'County financial reporting practice',
        defense:
          'Reserves protect against tax revenue volatility.',
        rebuttal:
          'A volatility reserve at one year of operations is standard. The current carryover is multiples of that.'
      },
      {
        name: 'New "supportive housing services" categories added without a return to voters',
        mechanism:
          'The ballot text named four uses. New service categories are being added under the same fund through county-level intergovernmental agreements.',
        controlledBy: 'Tri-county intergovernmental agreement process',
        defense:
          'Scope adjustments respond to evolving service models in the field.',
        rebuttal:
          'Scope additions belong in front of voters, or out of this fund. Otherwise the dedicated tax becomes a general one.'
      }
    ],
    ifUnblocked:
      'Sign multi-year provider contracts and reattach the four ballot uses as the only eligible uses. Within four years, 12,000 households get rent help and 1,800 supportive-housing beds come online.',
    blockerNews:
      'The 2025 Metro Auditor follow-up flagged new categories of "supportive housing services" being added without explicit voter authorization. Counties continue to add categories.'
  }
};
