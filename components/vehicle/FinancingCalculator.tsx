'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Calendar, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FinancingCalculatorProps {
  initialPrice?: number;
}

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  initialPrice = 38500000,
}) => {
  const [vehiclePrice, setVehiclePrice] = useState<number>(initialPrice);
  const [depositPercent, setDepositPercent] = useState<number>(30); // 30% default deposit
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36); // 36 months default
  const [interestRate, setInterestRate] = useState<number>(18); // 18% annual interest

  const depositAmount = useMemo(() => {
    return (vehiclePrice * depositPercent) / 100;
  }, [vehiclePrice, depositPercent]);

  const loanAmount = useMemo(() => {
    return Math.max(0, vehiclePrice - depositAmount);
  }, [vehiclePrice, depositAmount]);

  const calculations = useMemo(() => {
    if (loanAmount <= 0) {
      return { monthlyPayment: 0, totalRepayment: 0, totalInterest: 0 };
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    const n = loanTermMonths;

    let monthlyPayment = 0;
    if (monthlyInterestRate > 0) {
      monthlyPayment =
        (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n))) /
        (Math.pow(1 + monthlyInterestRate, n) - 1);
    } else {
      monthlyPayment = loanAmount / n;
    }

    const totalRepayment = monthlyPayment * n;
    const totalInterest = totalRepayment - loanAmount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalRepayment: Math.round(totalRepayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, loanTermMonths, interestRate]);

  const formatNaira = (val: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-11 h-11 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Vehicle Financing Calculator</h3>
          <p className="text-xs text-slate-500">Estimate your monthly payment and loan terms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Vehicle Price */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Vehicle Price (₦)
            </label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-brand-red text-sm"
            />
          </div>

          {/* Deposit slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Deposit ({depositPercent}%):</span>
              <span className="text-brand-red font-extrabold">{formatNaira(depositAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={5}
              value={depositPercent}
              onChange={(e) => setDepositPercent(Number(e.target.value))}
              className="w-full accent-brand-red cursor-pointer"
            />
          </div>

          {/* Loan Duration */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Loan Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermMonths(term)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    loanTermMonths === term
                      ? 'bg-brand-red text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {term} Mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Display */}
        <div className="p-6 rounded-2xl bg-zinc-950 text-white space-y-4 flex flex-col justify-between border border-zinc-800">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Estimated Monthly Payment
              </span>
              <p className="text-3xl sm:text-4xl font-black text-brand-red mt-1">
                {formatNaira(calculations.monthlyPayment)}
                <span className="text-xs font-semibold text-slate-400"> / month</span>
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span>Total Loan Amount:</span>
                <span className="text-white">{formatNaira(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Repayment:</span>
                <span className="text-white">{formatNaira(calculations.totalRepayment)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Interest ({interestRate}% p.a.):</span>
                <span className="text-amber-400">{formatNaira(calculations.totalInterest)}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/financing?price=${vehiclePrice}&deposit=${depositAmount}&term=${loanTermMonths}`}
            className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-red/30 transition-all text-center"
          >
            <span>Request Financing Approval</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Required Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Disclaimer:</strong> Financing calculations are estimates and do not constitute a loan approval or formal financial offer. Rates and terms are subject to final credit inspection and partner bank/lender conditions.
        </p>
      </div>
    </div>
  );
};
