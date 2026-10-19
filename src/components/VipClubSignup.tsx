import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Gift, 
  Check, 
  ArrowRight, 
  Copy, 
  Flame, 
  Award,
  Crown
} from 'lucide-react';
import { useToast } from './ToastNotification';

export const VipClubSignup: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vipCode, setVipCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = `VIP-LUM-${Math.floor(1000 + Math.random() * 9000)}`;
      setVipCode(generatedCode);
      showToast(
        'Welcome to the VIP Club',
        `Membership active! Show code ${generatedCode} on your visit for your complimentary welcome gift.`,
        'success'
      );
    }, 600);
  };

  const copyCode = () => {
    if (!vipCode) return;
    navigator.clipboard.writeText(vipCode);
    setCopied(true);
    showToast('Code Copied', `${vipCode} copied to clipboard!`, 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-[#c7a85c]/40 bg-gradient-to-br from-[#1c1712] via-[#14120f] to-[#0d0c0a] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(199,168,92,0.15),transparent_70%)] blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {vipCode ? (
          /* VIP Membership Card Result */
          <div className="rounded-2xl border border-[#c7a85c] bg-[#14120f] p-8 sm:p-10 shadow-2xl animate-fade-up">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-6 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c7a85c] flex items-center gap-1.5 font-bold mb-1">
                  <Crown size={14} className="text-[#c7a85c]" />
                  <span>VIP Hearth Circle · Member Pass</span>
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white">
                  Welcome to Luminary Privileges
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Issued to <strong className="text-white">{fullName || email}</strong> · Valid on your next reservation
                </p>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-white/40 block">Incentive Voucher</span>
                <span className="font-serif text-lg text-[#e5c97d] font-bold">Complimentary Welcome Gift</span>
              </div>
            </div>

            {/* Voucher Perks */}
            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0d0c0a] p-4 flex items-start gap-3">
                <Gift size={20} className="text-[#c7a85c] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm text-white font-medium">Welcome Gift Included</h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    Complimentary House Botanical Spritz & Warm Truffle Brioche for your entire party upon seating.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0d0c0a] p-4 flex items-start gap-3">
                <Award size={20} className="text-[#c7a85c] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm text-white font-medium">48-Hour Priority Drops</h4>
                  <p className="text-xs text-white/60 mt-0.5">
                    Private booking link unlocked 48 hours prior to public release on the 1st of every month.
                  </p>
                </div>
              </div>
            </div>

            {/* Code Box & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/40 block mb-1">
                  Your Personalized Code:
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl text-[#e5c97d] font-bold tracking-widest bg-[#0b0a09] px-3.5 py-1.5 rounded-lg border border-[#c7a85c]/40">
                    {vipCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="btn-pill-3d flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#1a1714] px-3 py-2 text-xs text-white hover:border-[#c7a85c]"
                    title="Copy VIP Code"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <a
                href="#reserve"
                className="btn-gold-3d flex items-center gap-2 rounded-xl px-6 py-3 text-[10px] uppercase tracking-[0.2em]"
              >
                <span>Book Table with VIP Code</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        ) : (
          /* Signup Form */
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#c7a85c] mb-3">
                <Crown size={14} className="text-[#c7a85c]" />
                <span>The Luminary VIP Hearth Club</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl text-white leading-tight">
                An Invitation to <br />
                <em className="font-normal text-[#c7a85c]">Extraordinary Dining</em>
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg">
                Join our private dining circle. Receive an immediate gift code for a <strong className="text-[#e5c97d]">complimentary house botanical spritz & warm black-truffle brioche</strong> on your next visit, plus 48-hour priority access to monthly reservation drops.
              </p>

              {/* Incentive highlights */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#e5c97d]">
                <span className="flex items-center gap-1.5">
                  <Gift size={13} className="text-[#c7a85c]" />
                  <span>Complimentary Appetizer & Drink Voucher</span>
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#c7a85c]" />
                  <span>Priority Table Drops</span>
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/15 bg-[#14120f] p-6 sm:p-8 shadow-xl space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="h-11 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="h-11 w-full rounded-xl border border-white/15 bg-[#0d0c0a] px-3.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#c7a85c]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold-3d w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[10px] uppercase tracking-[0.22em] mt-2"
              >
                {isSubmitting ? (
                  <span>Generating VIP Pass...</span>
                ) : (
                  <>
                    <Gift size={14} />
                    <span>Join & Claim Welcome Gift Code</span>
                  </>
                )}
              </button>

              <p className="text-[9px] text-white/40 text-center pt-1">
                Zero spam. You may withdraw at any time. Voucher code generated instantly.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
