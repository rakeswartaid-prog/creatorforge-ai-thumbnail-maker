import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Percent, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

export const UnitEconomicsCalculator: React.FC = () => {
  const [monthlyPriceUsd, setMonthlyPriceUsd] = useState(19);
  const [payingUsers, setPayingUsers] = useState(526);
  const [churnRate, setChurnRate] = useState(4.5); // %
  const [cac, setCac] = useState(12); // $ customer acquisition cost
  const [apiCostPerUser, setApiCostPerUser] = useState(0.08); // $
  const [exchangeRateInr, setExchangeRateInr] = useState(83); // 1 USD = 83 INR

  // Calculations
  const grossMrrUsd = payingUsers * monthlyPriceUsd;
  const grossMrrInr = grossMrrUsd * exchangeRateInr;
  const arrUsd = grossMrrUsd * 12;

  // Costs
  const paymentGatewayFeePercent = 0.029; // Stripe 2.9% + 30c
  const paymentFees = grossMrrUsd * paymentGatewayFeePercent + payingUsers * 0.3;
  const totalApiServerCosts = payingUsers * apiCostPerUser + 45; // $45 fixed infra
  const totalMonthlyCost = paymentFees + totalApiServerCosts;

  const netMonthlyProfitUsd = Math.max(0, grossMrrUsd - totalMonthlyCost);
  const netMonthlyProfitInr = netMonthlyProfitUsd * exchangeRateInr;
  const grossMarginPercent = grossMrrUsd > 0 ? ((netMonthlyProfitUsd / grossMrrUsd) * 100).toFixed(1) : '0';

  // LTV & CAC
  const customerLifespanMonths = churnRate > 0 ? 100 / churnRate : 24;
  const ltvUsd = monthlyPriceUsd * customerLifespanMonths;
  const ltvCacRatio = cac > 0 ? (ltvUsd / cac).toFixed(1) : '10+';

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
              Financial Modeling & Unit Economics
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">9-Month Target: $10,000 / mo (~₹8,30,000/mo)</span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">
            Interactive MRR & Unit Economics Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust subscription price, subscriber count, churn, and acquisition costs to observe real-time gross margins and runway.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Current Run-Rate</span>
            <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
              ${(arrUsd / 1000).toFixed(1)}k ARR
            </span>
          </div>
        </div>
      </div>

      {/* Main KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* MRR Card */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold text-slate-400">Monthly Run-Rate (MRR)</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-white font-display tabular-nums">
              ${grossMrrUsd.toLocaleString()}
            </span>
            <span className="text-xs text-amber-400 font-mono block mt-0.5 tabular-nums">
              ≈ ₹{(grossMrrInr / 100000).toFixed(2)} Lakhs / mo
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Target Goal: $10,000 / mo ({((grossMrrUsd / 10000) * 100).toFixed(0)}% reached)
          </span>
        </div>

        {/* Net Profit Card */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold text-slate-400">Net Monthly Profit</span>
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-amber-400 font-display tabular-nums">
              ${Math.round(netMonthlyProfitUsd).toLocaleString()}
            </span>
            <span className="text-xs text-slate-300 font-mono block mt-0.5 tabular-nums">
              ≈ ₹{(netMonthlyProfitInr / 100000).toFixed(2)} Lakhs Net
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
            {grossMarginPercent}% Net Profit Margin
          </span>
        </div>

        {/* LTV & CAC Card */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold text-slate-400">LTV : CAC Ratio</span>
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-sky-400 font-display tabular-nums">
              {ltvCacRatio}x
            </span>
            <span className="text-xs text-slate-400 font-mono block mt-0.5 tabular-nums">
              LTV: ${Math.round(ltvUsd)} · CAC: ${cac}
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
            Healthy SaaS benchmark &gt;3.0x
          </span>
        </div>

        {/* Paying Users Card */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono font-bold text-slate-400">Active Subscribers</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black text-white font-display tabular-nums">
              {payingUsers}
            </span>
            <span className="text-xs text-slate-400 font-mono block mt-0.5 tabular-nums">
              Monthly Churn: {churnRate}%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Avg. Lifespan: {Math.round(customerLifespanMonths)} Months
          </span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
        {/* Slider 1: Monthly Price */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Creator Pro Monthly Price</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              ${monthlyPriceUsd}/mo (₹{monthlyPriceUsd * exchangeRateInr})
            </span>
          </div>
          <input
            type="range"
            min="9"
            max="49"
            step="1"
            value={monthlyPriceUsd}
            onChange={(e) => setMonthlyPriceUsd(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500">
            Recommended sweet spot: $19/mo (US/Global) and ₹799/mo (India localized).
          </span>
        </div>

        {/* Slider 2: Paying Subscribers */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Paying Subscribers Count</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              {payingUsers} creators
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="1500"
            step="10"
            value={payingUsers}
            onChange={(e) => setPayingUsers(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500">
            526 subscribers at $19/mo achieves exactly $10,000 monthly recurring revenue.
          </span>
        </div>

        {/* Slider 3: Churn Rate */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Monthly Churn Rate</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              {churnRate}% / month
            </span>
          </div>
          <input
            type="range"
            min="2.0"
            max="12.0"
            step="0.5"
            value={churnRate}
            onChange={(e) => setChurnRate(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500">
            Kept low by providing recurring content calendar & multi-platform scheduler features.
          </span>
        </div>

        {/* Slider 4: Customer Acquisition Cost (CAC) */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-300">Blended CAC (Organic + Creator Affiliate)</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              ${cac} per paid user
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={cac}
            onChange={(e) => setCac(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500">
            Driven by organic short-form video demonstration (feed simulator hooks) and word-of-mouth.
          </span>
        </div>
      </div>

      {/* Cost Architecture Breakdown Table */}
      <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col gap-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
          Monthly P&L Statement at Current Scale ({payingUsers} Subscribers)
        </h4>
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/70 text-xs">
          <table className="w-full text-left">
            <thead className="border-b border-slate-800 text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-2.5 px-4">Line Item</th>
                <th className="py-2.5 px-4">Calculation Formula</th>
                <th className="py-2.5 px-4 text-right">Amount (USD)</th>
                <th className="py-2.5 px-4 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-2.5 px-4 font-bold text-white">Gross Subscription Revenue</td>
                <td className="py-2.5 px-4 text-slate-400">{payingUsers} users × ${monthlyPriceUsd}/mo</td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-400 tabular-nums">
                  +${grossMrrUsd.toLocaleString()}
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                  +₹{Math.round(grossMrrInr).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-300">Payment Processing (Stripe / Razorpay)</td>
                <td className="py-2.5 px-4 text-slate-400">2.9% + $0.30 per transaction</td>
                <td className="py-2.5 px-4 text-right font-mono text-red-400 tabular-nums">
                  -${Math.round(paymentFees)}
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-400 tabular-nums">
                  -₹{Math.round(paymentFees * exchangeRateInr).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 text-slate-300">Gemini 3.8 Flash AI API & Server Infrastructure</td>
                <td className="py-2.5 px-4 text-slate-400">{payingUsers} users × $0.08 + $45 server</td>
                <td className="py-2.5 px-4 text-right font-mono text-red-400 tabular-nums">
                  -${Math.round(totalApiServerCosts)}
                </td>
                <td className="py-2.5 px-4 text-right font-mono text-slate-400 tabular-nums">
                  -₹{Math.round(totalApiServerCosts * exchangeRateInr).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-slate-900/80 font-bold">
                <td className="py-3 px-4 text-amber-400">Net Monthly Pre-Tax Profit</td>
                <td className="py-3 px-4 text-slate-300">Take-home for 1–2 founders</td>
                <td className="py-3 px-4 text-right font-mono font-black text-amber-400 text-sm tabular-nums">
                  ${Math.round(netMonthlyProfitUsd).toLocaleString()} / mo
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-white text-sm tabular-nums">
                  ₹{Math.round(netMonthlyProfitInr).toLocaleString()} / mo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
