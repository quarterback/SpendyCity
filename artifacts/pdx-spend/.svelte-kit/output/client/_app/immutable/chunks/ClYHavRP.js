import{x as W,h as ve,aW as me,i as O,m as Q,ae as be,j as ye,g as le,k as Ce,aw as we,l as de,o as X,p as z,ac as Ae,aR as Me,aF as ce,z as Ie,aX as A,y as ee,aY as Se,B as Te,G as Ee,U as Fe,aQ as te,aZ as Re,a_ as Pe,aU as _e,as as ue,a$ as xe,a3 as Ne,q as he,w as ge,b0 as Z,au as Ue,b1 as Oe,b2 as Ye,aO as De,A as Be,v as Le,ad as ke}from"./B_nMbjcE.js";function en(e,t){return t}function He(e,t,i){for(var d=[],c=t.length,l,s=t.length,f=0;f<c;f++){let y=t[f];ge(y,()=>{if(l){if(l.pending.delete(y),l.done.add(y),l.pending.size===0){var m=e.outrogroups;ne(e,te(l.done)),m.delete(l),m.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var r=d.length===0&&i!==null;if(r){var p=i,o=p.parentNode;De(o),o.append(p),e.items.clear()}ne(e,t,!r)}else l={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(l)}function ne(e,t,i=!0){var d;if(e.pending.size>0){d=new Set;for(const s of e.pending.values())for(const f of s)d.add(e.items.get(f).e)}for(var c=0;c<t.length;c++){var l=t[c];if(d!=null&&d.has(l)){l.f|=A;const s=document.createDocumentFragment();Be(l,s)}else Le(t[c],i)}}var fe;function nn(e,t,i,d,c,l=null){var s=e,f=new Map,r=(t&me)!==0;if(r){var p=e;s=O?Q(be(p)):p.appendChild(W())}O&&ye();var o=null,y=Ee(()=>{var h=i();return Fe(h)?h:h==null?[]:te(h)}),m,C=new Map,w=!0;function F(h){(I.effect.f&Ne)===0&&(I.pending.delete(h),I.fallback=o,ze(I,m,s,t,d),o!==null&&(m.length===0?(o.f&A)===0?he(o):(o.f^=A,B(o,null,s)):ge(o,()=>{o=null})))}function a(h){I.pending.delete(h)}var u=ve(()=>{m=le(y);var h=m.length;let v=!1;if(O){var L=Ce(s)===we;L!==(h===0)&&(s=de(),Q(s),X(!1),v=!0)}for(var S=new Set,g=Ie,N=Te(),T=0;T<h;T+=1){O&&z.nodeType===Ae&&z.data===Me&&(s=z,v=!0,X(!1));var U=m[T],R=d(U,T),b=w?null:f.get(R);b?(b.v&&ce(b.v,U),b.i&&ce(b.i,T),N&&g.unskip_effect(b.e)):(b=je(f,w?s:fe??(fe=W()),U,R,T,c,t,i),w||(b.e.f|=A),f.set(R,b)),S.add(R)}if(h===0&&l&&!o&&(w?o=ee(()=>l(s)):(o=ee(()=>l(fe??(fe=W()))),o.f|=A)),h>S.size&&Se(),O&&h>0&&Q(de()),!w)if(C.set(g,S),N){for(const[k,H]of f)S.has(k)||g.skip_effect(H.e);g.oncommit(F),g.ondiscard(a)}else F(g);v&&X(!0),le(y)}),I={effect:u,items:f,pending:C,outrogroups:null,fallback:o};w=!1,O&&(s=z)}function D(e){for(;e!==null&&(e.f&Oe)===0;)e=e.next;return e}function ze(e,t,i,d,c){var U,R,b,k,H,ae,re,oe,ie;var l=(d&Ye)!==0,s=t.length,f=e.items,r=D(e.effect.first),p,o=null,y,m=[],C=[],w,F,a,u;if(l)for(u=0;u<s;u+=1)w=t[u],F=c(w,u),a=f.get(F).e,(a.f&A)===0&&((R=(U=a.nodes)==null?void 0:U.a)==null||R.measure(),(y??(y=new Set)).add(a));for(u=0;u<s;u+=1){if(w=t[u],F=c(w,u),a=f.get(F).e,e.outrogroups!==null)for(const M of e.outrogroups)M.pending.delete(a),M.done.delete(a);if((a.f&Z)!==0&&(he(a),l&&((k=(b=a.nodes)==null?void 0:b.a)==null||k.unfix(),(y??(y=new Set)).delete(a))),(a.f&A)!==0)if(a.f^=A,a===r)B(a,null,i);else{var I=o?o.next:r;a===e.effect.last&&(e.effect.last=a.prev),a.prev&&(a.prev.next=a.next),a.next&&(a.next.prev=a.prev),E(e,o,a),E(e,a,I),B(a,I,i),o=a,m=[],C=[],r=D(o.next);continue}if(a!==r){if(p!==void 0&&p.has(a)){if(m.length<C.length){var h=C[0],v;o=h.prev;var L=m[0],S=m[m.length-1];for(v=0;v<m.length;v+=1)B(m[v],h,i);for(v=0;v<C.length;v+=1)p.delete(C[v]);E(e,L.prev,S.next),E(e,o,L),E(e,S,h),r=h,o=S,u-=1,m=[],C=[]}else p.delete(a),B(a,r,i),E(e,a.prev,a.next),E(e,a,o===null?e.effect.first:o.next),E(e,o,a),o=a;continue}for(m=[],C=[];r!==null&&r!==a;)(p??(p=new Set)).add(r),C.push(r),r=D(r.next);if(r===null)continue}(a.f&A)===0&&m.push(a),o=a,r=D(a.next)}if(e.outrogroups!==null){for(const M of e.outrogroups)M.pending.size===0&&(ne(e,te(M.done)),(H=e.outrogroups)==null||H.delete(M));e.outrogroups.size===0&&(e.outrogroups=null)}if(r!==null||p!==void 0){var g=[];if(p!==void 0)for(a of p)(a.f&Z)===0&&g.push(a);for(;r!==null;)(r.f&Z)===0&&r!==e.fallback&&g.push(r),r=D(r.next);var N=g.length;if(N>0){var T=(d&me)!==0&&s===0?i:null;if(l){for(u=0;u<N;u+=1)(re=(ae=g[u].nodes)==null?void 0:ae.a)==null||re.measure();for(u=0;u<N;u+=1)(ie=(oe=g[u].nodes)==null?void 0:oe.a)==null||ie.fix()}He(e,g,T)}}l&&Ue(()=>{var M,se;if(y!==void 0)for(a of y)(se=(M=a.nodes)==null?void 0:M.a)==null||se.apply()})}function je(e,t,i,d,c,l,s,f){var r=(s&Re)!==0?(s&Pe)===0?_e(i,!1,!1):ue(i):null,p=(s&xe)!==0?ue(c):null;return{v:r,i:p,e:ee(()=>(l(t,r??i,p??c,f),()=>{e.delete(d)}))}}function B(e,t,i){if(e.nodes)for(var d=e.nodes.start,c=e.nodes.end,l=t&&(t.f&A)===0?t.nodes.start:i;d!==null;){var s=ke(d);if(l.before(d),d===c)return;d=s}}function E(e,t,i){t===null?e.effect.first=i:t.next=i,i===null?e.effect.last=t:i.prev=t}const Ge=`INTERNAL FINANCIAL MEMO
TO:        Metro Council, Metro Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Metro Affordable Housing Bond — unit-count classification
DATE:      As of latest reporting cycle

1. SUMMARY
Metro Measure 26-199 (2018) authorized $652.8M in general-obligation
bond proceeds to build or preserve approximately 3,900 affordable homes
across the tri-county region. Modeled restricted share of carry
balance: 83%. Modeled movable share: 17%.

2. STRUCTURAL FINDINGS
2.1  Per-unit construction cost has climbed materially above the
     pre-bond program assumption, narrowing the achievable unit count
     under the original delivery target.
2.2  Reporting now counts "preserved" units alongside newly built units
     to maintain the 3,900-home headline. The original ballot framing
     emphasized new construction.
2.3  Delivery timeline has been extended past the original sunset;
     jurisdictions have requested supplemental funds.

3. RECOMMENDATIONS
3.1  Report new-construction and preservation counts separately,
     each against the original ballot framing.
3.2  Publish a per-unit cost trend with cause-of-variance attribution.
3.3  Disclose any anticipated timeline extension and the implied
     financing cost to the issuing jurisdictions.

— end —
`,qe=`INTERNAL FINANCIAL MEMO
TO:        Council President, City Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Arts Education and Access Fund — material reserve and scope drift
DATE:      As of latest reporting cycle

1. SUMMARY
The Arts Education and Access Fund ("Arts Tax") was authorized by Measure
26-146 (2012) under PCC 5.73 to fund (a) K-5 arts and music teachers in
five area public school districts and (b) competitive grants to
qualifying arts non-profits.

Modeled year-end balance: see fund page.
Cumulative collections since inception: see fund page.
Modeled restricted share of balance: 74%.
Modeled movable / reclassified share of balance: 26%.

2. STRUCTURAL FINDINGS
2.1  Collection cost overhead has remained materially above the original
     5% statutory ceiling, addressed historically by amending the
     ceiling rather than reducing overhead.

2.2  Council action in 2017 expanded the eligible-uses definition beyond
     the K-5 teacher and grants frame defined in the ballot text. This
     was effected by ordinance, not by a follow-on ballot measure.

2.3  Carryover balance has been reported as "available for future
     allocation" without a published spend-down plan that ties
     disbursement to the original beneficiary classes.

3. RECOMMENDATIONS
3.1  Re-baseline the eligible-uses definition to the ballot text and
     report all post-2017 reallocations against that baseline.
3.2  Publish a multi-year spend-down plan tied to verifiable
     beneficiary outcomes (teacher headcount, grants disbursed).
3.3  Independent collections audit with public reporting on the
     compliance-rate gap relative to the eligible adult population.

— end —
`,Ve=`INTERNAL FINANCIAL MEMO
TO:        Council President, City Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Housing Investment Fund (TIF set-aside) — definition drift
DATE:      As of latest reporting cycle

1. SUMMARY
The 30% urban renewal tax-increment financing set-aside for affordable
housing is a charter-grade policy commitment, executed through Prosper
Portland TIF districts and the Portland Housing Bureau. The set-aside
percentage has been reported as substantially honored in headline
metrics. Modeled restricted share of carry balance: 62%. Modeled
movable / re-classifiable share: 38%.

2. STRUCTURAL FINDINGS
2.1  The operational definition of "affordable housing" eligible for
     set-aside compliance has expanded over time to include units up to
     120% of area median income and certain workforce-grade projects.
     Headline compliance rates depend on this expanded definition.

2.2  TIF set-aside obligations have been moved between districts via
     Council action, deferring delivery without reducing reported
     compliance.

2.3  An internal Prosper Portland memo identifies a multi-year backlog
     of set-aside obligations carried forward as future commitments
     rather than active projects.

3. RECOMMENDATIONS
3.1  Re-publish set-aside compliance using a fixed AMI ceiling tied to
     the original policy adoption.
3.2  Disclose all inter-district transfers of set-aside obligations
     and the resulting delivery-timeline impact.
3.3  Convert deferred obligations to scheduled commitments with
     publicly tracked milestones.

— end —
`,$e=`INTERNAL FINANCIAL MEMO
TO:        Council President, City Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Portland Clean Energy Community Benefits Fund — eligible-uses
           expansion and reserve trajectory
DATE:      As of latest reporting cycle

1. SUMMARY
PCEF was authorized by Measure 26-201 (2018) under PCC 7.07 as a 1%
surcharge on retail sales of large corporations operating in Portland.
Voter-stated purpose: clean-energy projects, workforce training, and
green infrastructure benefitting communities of color and low-income
residents.

Collections have materially exceeded original projections in every
reporting year. Modeled current balance and restricted share are
documented on the fund page. Modeled movable share — the portion of
balance now eligible for activities outside the original scope under
post-enactment Council action — is approximately 59%.

2. STRUCTURAL FINDINGS
2.1  Council policy package (2022) authorized PCEF dollars for
     activities including transit-adjacent paving, tree maintenance,
     and certain parks operations. These categories were not
     contemplated in the ballot text or pre-election fiscal note.

2.2  City Auditor (2023) found that projects funded under expanded
     categories did not consistently meet the original community-of-color
     and low-income benefit criteria.

2.3  The current spend-down horizon ("five-year") has been re-asserted
     in successive annual financial briefings without measurable
     reduction in carry-over balance.

3. RECOMMENDATIONS
3.1  Bifurcate fund accounting between (a) ballot-text-aligned uses
     and (b) post-enactment expanded uses. Report each separately.
3.2  Treat any backfill of general-fund maintenance categories as a
     departure from the ballot purpose and refer to ballot for
     reauthorization.
3.3  Adopt a fixed annual disbursement floor as a percentage of
     trailing collections to constrain reserve growth.

— end —
`,Je=`INTERNAL FINANCIAL MEMO
TO:        Multnomah County Board, County Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Preschool For All — collections vs. capacity build-up
DATE:      As of latest reporting cycle

1. SUMMARY
Preschool For All (Multnomah County Measure 26-214, 2020) is a
graduated personal income tax dedicated to providing tuition-free,
high-quality preschool to all 3- and 4-year-olds in the county, with
workforce wage standards. Modeled restricted share of balance: 82%.
Modeled movable share: 18%.

2. STRUCTURAL FINDINGS
2.1  Collections have outrun ramp-up capacity by a wide margin in every
     reporting year since enactment. Modeled accumulated balance is
     materially larger than the originally projected steady-state
     reserve.
2.2  Enrollment has lagged the implementation plan; eligible 3- and
     4-year-old population has been substantially under-served.
2.3  A Board vote on rate adjustment or collection pause has been
     deferred citing future capacity needs.

3. RECOMMENDATIONS
3.1  Publish a binding capacity build-up plan with monthly enrollment
     targets reconciled to collections.
3.2  Adopt a balance ceiling above which collection rate adjusts
     automatically.
3.3  Independent audit of provider-pipeline barriers (workforce,
     facility space) with funded remediation.

— end —
`,Ke=`INTERNAL FINANCIAL MEMO
TO:        Council President, City Auditor
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Rental Services / Tenant Protections Fund — under-deployment
DATE:      As of latest reporting cycle

1. SUMMARY
The Rental Services Fund is a per-unit landlord registration fee
authorized under PCC 7.02 and the city's tenant protections ordinance.
Voter / Council intent: tenant counseling, the Rental Housing Hotline,
fair-housing investigations, and dispute resolution. Modeled restricted
share of balance: 48%. Modeled movable / absorbed share: 52%.

2. STRUCTURAL FINDINGS
2.1  Tenant services spending has fallen below 50% of dedicated fund
     inflow despite documented unmet hotline demand.
2.2  Year-end balance has been partially reallocated to housing bureau
     administrative overhead under "operational support."
2.3  Performance reporting on tenant-services delivery is not
     reconciled to the dedicated revenue source.

3. RECOMMENDATIONS
3.1  Publish a tenant-services delivery report that reconciles to
     dedicated fund inflow on a quarterly basis.
3.2  Establish a minimum-deployment ratio and report exceptions.
3.3  Convert administrative absorptions to explicit, named transfers
     with Council action.

— end —
`,We=`INTERNAL FINANCIAL MEMO
TO:        Metro Council, tri-county leaders
FROM:      Office of Public Capacity (modeled)
SUBJECT:   Supportive Housing Services — execution gap and reserve framing
DATE:      As of latest reporting cycle

1. SUMMARY
Metro Measure 26-210 (2020) authorized tri-county taxes dedicated to
long-term rent assistance, behavioral health services, outreach, and
supportive housing. Modeled restricted share of balance: 74%. Modeled
movable share: 26%.

2. STRUCTURAL FINDINGS
2.1  Counties under-executed against contracted service capacity in the
     first two implementation years; Metro required corrective plans.
2.2  Carryover balances have begun appearing in financial statements as
     "long-term program reserves" rather than unspent obligations.
2.3  Auditor (2025) flagged new categories of "supportive housing
     services" being added without explicit voter authorization.
2.4  Tri-county spending agreement (2024) accelerated disbursement,
     but reserves continue to accrue.

3. RECOMMENDATIONS
3.1  Treat carryover balances as unspent obligations against contracted
     capacity, not as discretionary long-term reserves.
3.2  Refer scope-expansion categories back to the ballot or to a
     ratifying public process.
3.3  Publish quarterly contract-execution rates by county against
     authorized service capacity.

— end —
`,Qe=Object.assign({"../../content/funds/affordable-housing-dev.md":Ge,"../../content/funds/arts-tax.md":qe,"../../content/funds/housing-investment.md":Ve,"../../content/funds/pcef.md":$e,"../../content/funds/preschool-for-all.md":Je,"../../content/funds/rental-services.md":Ke,"../../content/funds/supportive-housing.md":We});function Xe(e){const t=e.match(/\/([^/]+)\.md$/);if(!t)throw new Error(`Could not derive slug from ${e}`);return t[1]}const pe=Object.fromEntries(Object.entries(Qe).map(([e,t])=>[Xe(e),t.trimEnd()])),n=1e6;function x(e){const t=[];let i=0,d=e.seed;for(let c=e.startYear;c<=e.endYear;c++){const l=c-e.startYear;d=(d*9301+49297)%233280;const s=1+(d/233280-.5)*(e.noise??.05),f=e.inflowStart*Math.pow(1+e.inflowGrowth,l)*s,r=f*Math.max(0,Math.min(1.4,e.spendRatio(l)));i=Math.max(0,i+f-r);const p=i*e.obligatedFraction;t.push({year:c,balance:Math.round(i),obligated:Math.round(p),spent:Math.round(r),inflow:Math.round(f)})}return t}function P(e){return e.map(t=>({year:t.year,reserve:Math.round(t.balance-t.obligated)}))}const j=x({startYear:2013,endYear:2025,inflowStart:8.2*n,inflowGrowth:.022,spendRatio:e=>e<2?.45:e<6?.78:e<10?.86:.92,obligatedFraction:.55,noise:.06,seed:11}),G=x({startYear:2019,endYear:2025,inflowStart:41*n,inflowGrowth:.34,spendRatio:e=>e<2?.05:e<4?.18:e<6?.42:.61,obligatedFraction:.41,noise:.04,seed:23}),q=x({startYear:2014,endYear:2025,inflowStart:27*n,inflowGrowth:.05,spendRatio:e=>e<2?.6:e<5?.82:e<9?.74:.69,obligatedFraction:.48,noise:.07,seed:37}),V=x({startYear:2018,endYear:2025,inflowStart:4.8*n,inflowGrowth:.09,spendRatio:e=>e<1?.32:e<3?.65:e<5?.81:.74,obligatedFraction:.35,noise:.06,seed:51}),$=x({startYear:2019,endYear:2025,inflowStart:95*n,inflowGrowth:.12,spendRatio:e=>e<2?.18:e<4?.46:e<6?.71:.78,obligatedFraction:.62,noise:.05,seed:67}),J=x({startYear:2021,endYear:2025,inflowStart:187*n,inflowGrowth:.16,spendRatio:e=>e<1?.04:e<2?.12:e<3?.31:.48,obligatedFraction:.39,noise:.04,seed:79}),K=x({startYear:2021,endYear:2025,inflowStart:248*n,inflowGrowth:.14,spendRatio:e=>e<1?.22:e<2?.51:e<3?.68:.74,obligatedFraction:.51,noise:.05,seed:89}),_=e=>e[e.length-1],Y=[{slug:"arts-tax",name:"Arts Education and Access Fund",shortName:"Arts Tax",enacted:2012,ballotMeasure:"Measure 26-146",enablingCode:"PCC 5.73",collector:"City of Portland Revenue Division",steward:"Regional Arts & Culture Council; PPS, Centennial, David Douglas, Parkrose, Reynolds",restrictionClass:"voter-restricted",voterIntent:"Restore K–5 arts and music teachers in Portland-area public schools and fund arts access grants for nonprofits, paid for by a $35 per-adult tax on income above $1,000.",oneLineStatus:'Collections lag, administrative overhead is structurally high, and the Council periodically authorizes carve-outs to "support arts ecosystem" outside the schools-and-grants frame.',modeledBalance:_(j).balance,modeledRestrictedShare:.74,modeledMovableShare:.26,cumulativeCollected:j.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"Annual filing, $35/adult flat",scandal:'A flat tax billed as a teacher-funding measure spends roughly one in eight dollars on the cost of collecting itself, and Council periodically expands what counts as "arts."',cashSeries:j,reserveSeries:P(j),auditEvents:[{year:2014,label:"Audit: collection cost overrun",body:"City Auditor finds collection costs exceed the statutory 5% cap; ordinance amended to redefine the cap rather than reduce overhead.",source:"Portland City Auditor, Arts Tax Performance Review"},{year:2017,label:"Council: scope expansion",body:"Council authorizes use of arts tax funds for general arts programming beyond the K–5 teacher and grants frame defined in the ballot measure.",source:"Council Resolution; ordinance amendment"},{year:2021,label:"Discovery: surplus carryover",body:'Reserve balance reaches a multi-year surplus; staff briefing notes "carryover for future allocation," with no remediation plan to disburse.',source:"Bureau briefing memo"},{year:2024,label:"Audit: collection rate",body:"Compliance rate among adult filers remains under 75%; revenue forecasting flagged as overstated.",source:"City Auditor follow-up"}],drift:[{year:2013,voterIntent:100,actualUse:95},{year:2015,voterIntent:100,actualUse:88},{year:2017,voterIntent:100,actualUse:78,note:"Scope expansion"},{year:2019,voterIntent:100,actualUse:72},{year:2021,voterIntent:100,actualUse:68},{year:2023,voterIntent:100,actualUse:65},{year:2025,voterIntent:100,actualUse:63}],promiseVsHappened:[{cycle:"FY 2014",promised:8.5*n,delivered:5.9*n},{cycle:"FY 2016",promised:9.1*n,delivered:7.8*n},{cycle:"FY 2018",promised:9.6*n,delivered:8.3*n},{cycle:"FY 2020",promised:10.2*n,delivered:7.1*n},{cycle:"FY 2022",promised:10.8*n,delivered:9.4*n},{cycle:"FY 2024",promised:11.3*n,delivered:9.7*n}],citations:["Portland City Code 5.73 (Arts Education and Access Income Tax)","Ballot Measure 26-146 (2012)","Portland City Auditor, Arts Tax Performance Reviews (2014, 2024)"],memo:""},{slug:"pcef",name:"Portland Clean Energy Community Benefits Fund",shortName:"PCEF",enacted:2018,ballotMeasure:"Measure 26-201",enablingCode:"PCC 7.07",collector:"City of Portland Revenue Division",steward:"PCEF Bureau, City of Portland",restrictionClass:"voter-restricted",voterIntent:"A 1% surcharge on retail sales of large corporations operating in Portland, dedicated to clean-energy projects, workforce training, and green infrastructure benefitting communities of color and low-income residents.",oneLineStatus:"Collections vastly outran original projections; the Council subsequently authorized broader uses including general transportation, parks, and sewer maintenance — items not contemplated in the ballot text.",modeledBalance:_(G).balance,modeledRestrictedShare:.41,modeledMovableShare:.59,cumulativeCollected:G.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"Quarterly large-retailer filings",scandal:'A surcharge passed for clean energy and BIPOC workforce now backfills street paving and parks budgets after Council expanded "eligible uses" by simple majority.',cashSeries:G,reserveSeries:P(G),auditEvents:[{year:2020,label:"Initial revenue triple forecast",body:"First full-year collections come in roughly three times the pre-election forecast, surfacing a multi-year accumulating reserve.",source:"PCEF Annual Report"},{year:2022,label:"Council: broaden eligible uses",body:"Council adopts a policy package authorizing PCEF dollars for activities including transit-adjacent paving, tree maintenance, and certain parks operations.",source:"Council Ordinance; staff report"},{year:2023,label:"Audit: equity criteria slippage",body:"Auditor finds projects funded under expanded categories do not consistently meet the original community-of-color and low-income benefit criteria.",source:"City Auditor PCEF review"},{year:2024,label:"Discovery: stranded balance",body:"Year-end balance exceeds $400M modeled; spend-down plan adopts five-year horizon. Critics note the same horizon recurs annually.",source:"Bureau financial memo"},{year:2025,label:"Council: budget backfill",body:'PCEF funds proposed to backfill general fund shortfalls in transportation maintenance under "eligible green infrastructure" language.',source:"Mayor budget proposal"}],drift:[{year:2019,voterIntent:100,actualUse:99},{year:2020,voterIntent:100,actualUse:92},{year:2021,voterIntent:100,actualUse:85},{year:2022,voterIntent:100,actualUse:64,note:"Eligible-uses expansion"},{year:2023,voterIntent:100,actualUse:53},{year:2024,voterIntent:100,actualUse:48},{year:2025,voterIntent:100,actualUse:41,note:"Backfill proposal"}],promiseVsHappened:[{cycle:"FY 2020",promised:44*n,delivered:5*n},{cycle:"FY 2021",promised:90*n,delivered:21*n},{cycle:"FY 2022",promised:145*n,delivered:78*n},{cycle:"FY 2023",promised:188*n,delivered:121*n},{cycle:"FY 2024",promised:235*n,delivered:169*n}],citations:["Portland City Code 7.07 (Clean Energy Surcharge)","Ballot Measure 26-201 (2018)","City Auditor, PCEF Performance Audits (2023)","PCEF Annual Reports (2020–2024)"],memo:""},{slug:"housing-investment",name:"Housing Investment Fund (TIF Set-Aside)",shortName:"Housing Investment",enacted:2006,ballotMeasure:void 0,enablingCode:"Council Resolution; Prosper Portland TIF set-aside policy",collector:"Prosper Portland (TIF districts)",steward:"Portland Housing Bureau",restrictionClass:"charter-restricted",voterIntent:"A policy commitment that 30% of urban renewal tax-increment financing (TIF) revenue is set aside for affordable housing development inside each district.",oneLineStatus:'Set-aside percentages have been honored in headline reporting but partially offset by reclassifying eligible projects, swapping districts, and converting "obligations" into deferred allocations.',modeledBalance:_(q).balance,modeledRestrictedShare:.62,modeledMovableShare:.38,cumulativeCollected:q.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"Continuous TIF accrual; annual budget cycle",scandal:'A 30% set-aside policy has been re-engineered through reclassification: projects counted as "affordable" include workforce-grade and market-rate-with-amenities developments.',cashSeries:q,reserveSeries:P(q),auditEvents:[{year:2015,label:"Audit: definition drift",body:'Auditor flags expanding definition of "affordable housing" being counted toward set-aside compliance, including units up to 120% AMI.',source:"City Auditor housing review"},{year:2018,label:"Council: district swap",body:"Set-aside obligations from one TIF district moved to another with a different schedule, deferring delivery without reducing reported compliance.",source:"Council Resolution"},{year:2021,label:"Discovery: deferred obligations",body:"Internal memo identifies a multi-year backlog of TIF set-aside obligations carried as future commitments rather than active projects.",source:"Prosper Portland internal memo"}],drift:[{year:2014,voterIntent:100,actualUse:92},{year:2016,voterIntent:100,actualUse:85},{year:2018,voterIntent:100,actualUse:76,note:"District swap"},{year:2020,voterIntent:100,actualUse:71},{year:2022,voterIntent:100,actualUse:66},{year:2024,voterIntent:100,actualUse:62}],promiseVsHappened:[{cycle:"FY 2016",promised:32*n,delivered:24*n},{cycle:"FY 2018",promised:35*n,delivered:26*n},{cycle:"FY 2020",promised:38*n,delivered:29*n},{cycle:"FY 2022",promised:41*n,delivered:28*n},{cycle:"FY 2024",promised:43*n,delivered:30*n}],citations:["Prosper Portland TIF Set-Aside Policy","City Auditor TIF Housing Reports"],memo:""},{slug:"rental-services",name:"Rental Services / Tenant Protections Fund",shortName:"Rental Services",enacted:2018,ballotMeasure:void 0,enablingCode:"PCC 7.02 (Residential Rental Registration); Tenant Protections Ordinance",collector:"City of Portland Revenue Division",steward:"Portland Housing Bureau, Rental Services Office",restrictionClass:"enabling-act-restricted",voterIntent:"Annual per-unit landlord registration fee dedicated to tenant counseling, the Rental Housing Hotline, fair-housing investigations, and dispute resolution.",oneLineStatus:"Fee revenue is routinely under-deployed against the program lines it was created for; balances have been periodically swept toward general housing administration.",modeledBalance:_(V).balance,modeledRestrictedShare:.48,modeledMovableShare:.52,cumulativeCollected:V.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"Annual landlord registration ($60/unit modeled)",scandal:"A landlord-paid fund for tenant services consistently spends less than half its inflow on tenant services, with the remainder absorbed into housing-bureau overhead.",cashSeries:V,reserveSeries:P(V),auditEvents:[{year:2019,label:"Audit: under-utilization",body:"Tenant services spending falls below 50% of dedicated fund inflow despite documented unmet hotline demand.",source:"City Auditor tenant services review"},{year:2022,label:"Council: administrative sweep",body:'Year-end balance partially reallocated to housing bureau administrative overhead under "operational support."',source:"Adopted budget; staff report"},{year:2024,label:"Discovery: hotline backlog",body:"Tenant hotline call wait times exceed program standards even as restricted reserve balance grows.",source:"Bureau performance report"}],drift:[{year:2018,voterIntent:100,actualUse:96},{year:2019,voterIntent:100,actualUse:87},{year:2020,voterIntent:100,actualUse:78},{year:2022,voterIntent:100,actualUse:64,note:"Sweep"},{year:2023,voterIntent:100,actualUse:58},{year:2025,voterIntent:100,actualUse:52}],promiseVsHappened:[{cycle:"FY 2019",promised:5.4*n,delivered:3.1*n},{cycle:"FY 2021",promised:6.2*n,delivered:3.9*n},{cycle:"FY 2023",promised:7.1*n,delivered:4.4*n},{cycle:"FY 2025",promised:7.9*n,delivered:4.9*n}],citations:["Portland City Code 7.02","Tenant Protections Ordinance","City Auditor Rental Services reviews"],memo:""},{slug:"affordable-housing-dev",name:"Metro Affordable Housing Bond",shortName:"Affordable Housing Bond",enacted:2018,ballotMeasure:"Metro Measure 26-199",enablingCode:"Metro Code Chapter 7; bond covenants",collector:"Metro Regional Government (property tax levy)",steward:"Metro and partner jurisdictions (Portland, Multnomah County, Washington County)",restrictionClass:"voter-restricted",voterIntent:"A regional general-obligation bond authorizing $652.8M to build or preserve 3,900 affordable homes for working families, seniors, veterans, and people with disabilities.",oneLineStatus:'Unit counts have been adjusted downward relative to original targets; per-unit costs have grown well above the projection range; "preserved" vs "built" classification has shifted to maintain headline numbers.',modeledBalance:_($).balance,modeledRestrictedShare:.83,modeledMovableShare:.17,cumulativeCollected:$.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"GO bond proceeds disbursed against approved projects",scandal:'A 3,900-home bond is on track to deliver fewer homes per dollar than promised; jurisdictions have re-classified "preservation" of existing units to keep count metrics intact.',cashSeries:$,reserveSeries:P($),auditEvents:[{year:2020,label:"Audit: per-unit cost growth",body:"Per-unit construction cost climbs above the bond program assumption, narrowing the achievable unit count.",source:"Metro auditor"},{year:2022,label:"Discovery: classification shift",body:'Reporting begins counting "preserved" units alongside newly built units to maintain the 3,900-home headline.',source:"Metro performance report"},{year:2024,label:"Council: timeline extension",body:"Delivery timeline extended past original sunset; jurisdictions request supplemental funds.",source:"Metro Council action"}],drift:[{year:2019,voterIntent:100,actualUse:98},{year:2020,voterIntent:100,actualUse:92},{year:2021,voterIntent:100,actualUse:88},{year:2022,voterIntent:100,actualUse:81,note:"Classification shift"},{year:2023,voterIntent:100,actualUse:79},{year:2025,voterIntent:100,actualUse:76}],promiseVsHappened:[{cycle:"FY 2020",promised:110*n,delivered:28*n},{cycle:"FY 2021",promised:130*n,delivered:67*n},{cycle:"FY 2022",promised:145*n,delivered:102*n},{cycle:"FY 2023",promised:160*n,delivered:121*n},{cycle:"FY 2024",promised:175*n,delivered:137*n}],citations:["Metro Measure 26-199 (2018)","Metro Affordable Housing Bond performance reports","Metro Auditor reports"],memo:""},{slug:"preschool-for-all",name:"Preschool For All",shortName:"Preschool For All",enacted:2020,ballotMeasure:"Multnomah County Measure 26-214",enablingCode:"Multnomah County Personal Income Tax; County Resolution",collector:"Multnomah County (PIT, payroll withholding)",steward:"Multnomah County Preschool & Early Learning Division",restrictionClass:"voter-restricted",voterIntent:"A graduated personal income tax dedicated to providing tuition-free, high-quality preschool to all 3- and 4-year-olds in Multnomah County, with workforce wage standards.",oneLineStatus:"Collections sharply outran ramp-up capacity, producing a multi-hundred-million accumulated balance even as enrollment lagged the implementation plan.",modeledBalance:_(J).balance,modeledRestrictedShare:.82,modeledMovableShare:.18,cumulativeCollected:J.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"Annual filings + payroll withholding",scandal:"A tuition-free preschool tax has built a half-billion-dollar surplus while serving a fraction of the eligible 3- and 4-year-olds the measure was designed to cover.",cashSeries:J,reserveSeries:P(J),auditEvents:[{year:2022,label:"Discovery: enrollment shortfall",body:"First full implementation year enrolls a small fraction of eligible 3- and 4-year-olds against the ramp plan.",source:"County program report"},{year:2023,label:"Audit: balance accumulation",body:"Auditor flags accelerating reserve growth and recommends a clearer disbursement strategy tied to provider capacity build-up.",source:"County Auditor"},{year:2024,label:"Board: rate adjustment debate",body:"County Board considers reducing the tax rate or pausing collections; vote deferred citing future capacity needs.",source:"County Board minutes"}],drift:[{year:2021,voterIntent:100,actualUse:100},{year:2022,voterIntent:100,actualUse:88},{year:2023,voterIntent:100,actualUse:79,note:"Enrollment shortfall"},{year:2024,voterIntent:100,actualUse:74},{year:2025,voterIntent:100,actualUse:71}],promiseVsHappened:[{cycle:"FY 2022",promised:90*n,delivered:11*n},{cycle:"FY 2023",promised:130*n,delivered:41*n},{cycle:"FY 2024",promised:175*n,delivered:79*n},{cycle:"FY 2025",promised:215*n,delivered:118*n}],citations:["Multnomah County Measure 26-214 (2020)","County Auditor Preschool For All reports","County Preschool & Early Learning Division annual reports"],memo:""},{slug:"supportive-housing",name:"Supportive Housing Services Measure",shortName:"SHS",enacted:2020,ballotMeasure:"Metro Measure 26-210",enablingCode:"Metro Code Chapter 7; intergovernmental agreements with counties",collector:"Metro (PIT and business income tax in tri-county region)",steward:"Multnomah, Washington, and Clackamas Counties",restrictionClass:"voter-restricted",voterIntent:"Tri-county taxes dedicated to long-term rent assistance, behavioral health services, outreach, and supportive housing to end chronic homelessness in the region.",oneLineStatus:'Counties have collected far more than they could disburse against contracted capacity; carryover balances are being reframed as "long-term reserves" without clear voter mandate.',modeledBalance:_(K).balance,modeledRestrictedShare:.74,modeledMovableShare:.26,cumulativeCollected:K.reduce((e,t)=>e+t.inflow,0),collectionsCadence:"PIT + business income tax, withheld and remitted",scandal:"A homelessness measure has accumulated a multi-hundred-million dollar reserve while service contracts go unfilled and rent assistance waitlists grow.",cashSeries:K,reserveSeries:P(K),auditEvents:[{year:2022,label:"Audit: contract execution lag",body:"Counties under-execute against contracted service capacity in the first two implementation years; Metro requires corrective plans.",source:"Metro performance audit"},{year:2023,label:"Discovery: reserve framing",body:'Carryover balances begin appearing in financial statements as "long-term program reserves" rather than unspent obligations.',source:"County financial statements"},{year:2024,label:"Council: spending agreement",body:"Tri-county leaders sign a spending agreement intended to accelerate disbursement; quarterly reporting required.",source:"Intergovernmental agreement"},{year:2025,label:"Audit: scope expansion",body:'Auditor flags new categories of "supportive housing services" being added without explicit voter authorization.',source:"Metro auditor follow-up"}],drift:[{year:2021,voterIntent:100,actualUse:96},{year:2022,voterIntent:100,actualUse:84,note:"Execution lag"},{year:2023,voterIntent:100,actualUse:76},{year:2024,voterIntent:100,actualUse:71},{year:2025,voterIntent:100,actualUse:67,note:"Scope expansion"}],promiseVsHappened:[{cycle:"FY 2022",promised:250*n,delivered:142*n},{cycle:"FY 2023",promised:285*n,delivered:188*n},{cycle:"FY 2024",promised:320*n,delivered:226*n},{cycle:"FY 2025",promised:350*n,delivered:261*n}],citations:["Metro Measure 26-210 (2020)","Metro Auditor SHS Performance Audits","County financial statements (Multnomah, Washington, Clackamas)"],memo:""}];Y.forEach(e=>{pe[e.slug]&&(e.memo=pe[e.slug])});const tn=Object.fromEntries(Y.map(e=>[e.slug,e])),an=Y.reduce((e,t)=>e+t.modeledBalance,0),rn=Y.reduce((e,t)=>e+t.cumulativeCollected,0),on=Y.reduce((e,t)=>e+t.modeledBalance*t.modeledRestrictedShare,0),sn=Y.reduce((e,t)=>e+t.modeledBalance*t.modeledMovableShare,0);export{Y as F,sn as T,an as a,rn as b,on as c,tn as d,nn as e,en as i};
