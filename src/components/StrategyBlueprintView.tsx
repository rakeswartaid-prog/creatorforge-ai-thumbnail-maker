import React, { useState } from 'react';
import {
  UNDERSERVED_NICHES,
  COMPETITORS,
  MVP_FEATURES,
  SKIPPED_FEATURES,
  FOUR_WEEK_PLAN,
  TECH_STACK_DATA,
  MONETIZATION_TIERS,
  MARKETING_IDEAS,
  RISKS_AND_DEFENSES,
} from '../data/strategyBlueprint';
import {
  Target,
  Swords,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

export const StrategyBlueprintView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'market' | 'features' | 'tech' | 'monetization' | 'growth' | 'risks'>('market');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyScript = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Product Management & Growth Playbook
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">Bootstrapped 1–2 Person Team</span>
          </div>
          <h2 className="text-2xl font-black text-white font-display">
            Strategic Masterplan: $10,000 / mo (₹8.3 Lakhs) MRR in 9 Months
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Exhaustive operational blueprint covering market sub-niches, competitor teardown, tech stack unit economics, 4-week sprint execution, and distribution playbooks.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Target ICP</span>
            <span className="text-xs font-bold text-white">YouTube & Reel Creators</span>
          </div>
          <div className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Target Run-Rate</span>
            <span className="text-xs font-bold text-amber-400 font-mono tabular-nums">$120,000 ARR</span>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800">
        <button
          onClick={() => setActiveSubTab('market')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'market' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          1. Market & Competitors
        </button>
        <button
          onClick={() => setActiveSubTab('features')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'features' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          2. MVP & 4-Week Sprint
        </button>
        <button
          onClick={() => setActiveSubTab('tech')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'tech' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          3. Tech Stack & APIs
        </button>
        <button
          onClick={() => setActiveSubTab('monetization')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'monetization' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          4. Monetization & Pricing
        </button>
        <button
          onClick={() => setActiveSubTab('growth')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'growth' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          5. Launch & 10 Scripts
        </button>
        <button
          onClick={() => setActiveSubTab('risks')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'risks' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          6. Risks & Mitigation
        </button>
      </div>

      {/* SECTION 1: MARKET & COMPETITORS */}
      {activeSubTab === 'market' && (
        <div className="flex flex-col gap-6">
          {/* Underserved Sub-Niches */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              Three Underserved High-Intent Sub-Niches
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {UNDERSERVED_NICHES.map((niche, idx) => (
                <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-amber-400 font-display">{niche.title}</h4>
                  <p className="text-xs text-slate-300 font-medium">ICP: {niche.audience}</p>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800/80 my-1">
                    <span className="text-[10px] uppercase font-bold text-red-400 block mb-0.5">The Pain Gap:</span>
                    <p className="text-xs text-slate-400 leading-relaxed">{niche.marketGap}</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                    <strong className="text-emerald-400">Our Opportunity:</strong> {niche.opportunity}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Teardown Matrix */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              Competitor Teardown Matrix (Real User Review Weaknesses)
            </h3>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/50">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4">Competitor</th>
                    <th className="py-3 px-4">Pricing</th>
                    <th className="py-3 px-4">Core Strength</th>
                    <th className="py-3 px-4">Biggest Weaknesses (Reviews)</th>
                    <th className="py-3 px-4">Our Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {COMPETITORS.map((comp, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">{comp.name}</td>
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap font-mono">{comp.pricing}</td>
                      <td className="py-3.5 px-4 text-slate-400">{comp.coreStrength}</td>
                      <td className="py-3.5 px-4">
                        <ul className="list-disc list-inside text-slate-400 space-y-1">
                          {comp.userReviewWeaknesses.map((w, wi) => (
                            <li key={wi} className="text-[11px] leading-snug">{w}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">{comp.ourUnfairAdvantage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* The One Pain Point Solved Better */}
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-col gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              The One Critical Pain Point We Solve Better Than Anyone
            </span>
            <h4 className="text-base font-bold text-white font-display">
              "The Packaging Disconnect": Uniting the Spoken 3-Second Hook with the Visual Thumbnail
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every competitor treats thumbnails as isolated static images and video scripts as text files. In reality, modern YouTube and Reels retention algorithms penalize channels where the thumbnail text promises something that the first 3 seconds of spoken video fail to pay off immediately.
              <strong> CreatorForge synthesizes the psychological spoken hook and the high-CTR visual cover simultaneously</strong>, and lets creators preview it inside an interactive live feed next to competitors in under 60 seconds.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: MVP FEATURES & 4-WEEK SPRINT */}
      {activeSubTab === 'features' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Must Have Features */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Must-Have Features for v1 (Delivered Here)
              </h3>
              <div className="flex flex-col gap-2.5">
                {MVP_FEATURES.map((feat, i) => (
                  <div key={i} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{feat.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {feat.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliberately Skipped Features */}
            <div className="flex flex-col gap-3">
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                Features to Deliberately Skip in v1
              </h3>
              <div className="flex flex-col gap-2.5">
                {SKIPPED_FEATURES.map((skip, i) => (
                  <div key={i} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
                    <span className="text-xs font-bold text-red-400 block mb-1">🚫 {skip.feature}</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Strategic Rationale:</strong> {skip.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4-Week Sprint Plan */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              4-Week Lean Build Plan (Week-by-Week)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {FOUR_WEEK_PLAN.map((plan, i) => (
                <div key={i} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col gap-3">
                  <span className="text-xs font-bold text-amber-400 font-mono">{plan.week}</span>
                  <ul className="space-y-2">
                    {plan.tasks.map((task, ti) => (
                      <li key={ti} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400 font-bold">›</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TECH STACK & APIS */}
      {activeSubTab === 'tech' && (
        <div className="flex flex-col gap-6">
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col gap-2">
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">
              Architectural Decision
            </span>
            <h3 className="text-base font-bold text-white font-display">
              {TECH_STACK_DATA.recommendation}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{TECH_STACK_DATA.reasoning}</p>
          </div>

          {/* Framework Comparison */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Framework Evaluation Matrix
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TECH_STACK_DATA.stackComparison.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <span className="text-xs font-bold text-white">{item.framework}</span>
                  <div className="text-[11px] text-emerald-400">
                    <strong>Pros:</strong> {item.pros}
                  </div>
                  <div className="text-[11px] text-red-400">
                    <strong>Cons:</strong> {item.cons}
                  </div>
                  <div className="mt-auto pt-2 border-t border-slate-800/80 text-xs font-mono text-amber-400 font-semibold">
                    {item.verdict}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Costs Breakdown */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              API & Cloud Cost Breakdown Per Active User
            </h4>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/50">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono">
                  <tr>
                    <th className="py-3 px-4">Component</th>
                    <th className="py-3 px-4">Pricing Model</th>
                    <th className="py-3 px-4">Cost Per User / Month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {TECH_STACK_DATA.apiCosts.map((cost, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-white">{cost.item}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono">{cost.cost}</td>
                      <td className="py-3 px-4 text-emerald-400 font-mono font-bold tabular-nums">
                        {cost.perUserMonthly}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MONETIZATION & PRICING */}
      {activeSubTab === 'monetization' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MONETIZATION_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl flex flex-col justify-between gap-5 border transition-all ${
                  tier.highlighted
                    ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-400/5 relative'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-6 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                    Recommended / Most Popular
                  </span>
                )}
                <div>
                  <span className="text-xs uppercase font-mono text-slate-400 font-semibold">{tier.name}</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-display tabular-nums">
                      {tier.priceGlobal}
                    </span>
                    <span className="text-xs text-slate-400">({tier.priceIndia})</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{tier.billing}</span>

                  <div className="my-4 py-2 px-3 bg-slate-950 rounded-lg border border-slate-800/80 text-xs font-semibold text-amber-400">
                    {tier.credits}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {tier.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    tier.highlighted
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Unit Economics Snapshot */}
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              The Path to $10,000 / Month (₹8,30,000/mo) MRR
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Paying Users Needed</span>
                <span className="text-xl font-bold text-white font-mono tabular-nums">526 subscribers</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">at $19/mo Creator Pro</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Monthly API & Server Cost</span>
                <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">$42 / month</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">&lt;0.5% of total gross revenue</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Gross Profit Margin</span>
                <span className="text-xl font-bold text-emerald-400 font-mono tabular-nums">92.4%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">After payment processing fees</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Estimated Net Profit</span>
                <span className="text-xl font-bold text-amber-400 font-mono tabular-nums">$9,150 / mo</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">₹7.6 Lakhs net monthly profit</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: LAUNCH & 10 CONTENT SCRIPTS */}
      {activeSubTab === 'growth' && (
        <div className="flex flex-col gap-6">
          {/* 30-Day Launch Timeline */}
          <div className="p-5 bg-slate-900/70 border border-slate-800 rounded-2xl flex flex-col gap-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              30-Day Pre-Launch & Launch Strategy
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">Days 1–10: Private Creator Alpha</span>
                <p className="text-slate-400 leading-relaxed">
                  Direct message 50 small YouTubers (1k–20k subs) offering free thumbnail redesigns using the tool. Record their genuine reactions to use as organic social proof.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">Days 11–20: Content Seeding</span>
                <p className="text-slate-400 leading-relaxed">
                  Publish 2 short-form videos daily demonstrating the "Feed Simulator" and "Glanceability Test" (the most viral visual mechanic).
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">Days 21–30: Public Launch Week</span>
                <p className="text-slate-400 leading-relaxed">
                  Launch on Product Hunt, r/NewTubers, and Indie Hackers with an exclusive "Founder Lifetime Pass" for the first 100 users to generate $19,900 upfront runway.
                </p>
              </div>
            </div>
          </div>

          {/* 10 Marketing Scripts */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              10 Ready-to-Use Short-Form Marketing Scripts (Copy & Shoot)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MARKETING_IDEAS.map((idea) => (
                <div key={idea.id} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span className="font-bold text-amber-400 font-mono">#{idea.id} · {idea.angle}</span>
                      <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{idea.targetPlatform}</span>
                    </div>
                    <h5 className="text-xs font-bold text-white leading-snug mb-2">"{idea.hook}"</h5>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                      <strong>Script Outline:</strong> {idea.scriptOutline}
                    </p>
                  </div>

                  <button
                    onClick={() => copyScript(`Hook: "${idea.hook}"\nOutline: ${idea.scriptOutline}`, idea.id)}
                    className="self-end px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === idea.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === idea.id ? 'Copied' : 'Copy Outline'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: RISKS & MITIGATION */}
      {activeSubTab === 'risks' && (
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Top 5 Business & Technical Risks and How We Mitigate Each
          </h3>
          <div className="flex flex-col gap-3">
            {RISKS_AND_DEFENSES.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <span className="text-xs font-bold text-amber-400 block mb-1">{item.risk}</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400">Tactical Defense:</strong> {item.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
