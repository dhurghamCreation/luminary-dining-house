import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Calendar, 
  Compass, 
  Check, 
  Copy,
  Car,
  Train
} from 'lucide-react';
import { useToast } from './ToastNotification';

export const UnifiedHoursMapIndicator: React.FC = () => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{
    isOpen: boolean;
    label: string;
    subLabel: string;
    color: string;
  }>({
    isOpen: true,
    label: 'Currently Seating Guests',
    subLabel: 'Kitchen closes at 10:15 PM · Reservations recommended',
    color: 'emerald',
  });

  // Calculate live NYC hours
  useEffect(() => {
    const checkOpenStatus = () => {
      // Get current time in New York
      const now = new Date();
      const nycTimeStr = now.toLocaleString('en-US', { timeZone: 'America/New_York' });
      const nycDate = new Date(nycTimeStr);
      const day = nycDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const hours = nycDate.getHours();
      const minutes = nycDate.getMinutes();
      const currentMinuteOfDay = hours * 60 + minutes;

      // Tuesday (2) through Saturday (6): 5:30 PM (17:30 = 1050 min) to 11:30 PM (23:30 = 1410 min)
      // Kitchen closes at 10:15 PM (22:15 = 1335 min)
      const isServiceDay = day >= 2 && day <= 6;
      const isOpen = isServiceDay && currentMinuteOfDay >= 1050 && currentMinuteOfDay <= 1410;
      const isKitchenOpen = isServiceDay && currentMinuteOfDay >= 1050 && currentMinuteOfDay <= 1335;

      if (isOpen) {
        if (isKitchenOpen) {
          setStatus({
            isOpen: true,
            label: 'Dining House Open · Seating Diners',
            subLabel: 'Last kitchen orders at 10:15 PM EDT',
            color: 'emerald',
          });
        } else {
          setStatus({
            isOpen: true,
            label: 'Late Evening Drinks & Salon Open',
            subLabel: 'Kitchen closed for the evening · Bar open until midnight',
            color: 'amber',
          });
        }
      } else {
        let nextOpen = 'Tuesday at 5:30 PM';
        if (day >= 2 && day <= 6 && currentMinuteOfDay < 1050) {
          nextOpen = 'Today at 5:30 PM EDT';
        } else if (day >= 1 && day <= 5) {
          nextOpen = 'Tomorrow at 5:30 PM EDT';
        }

        setStatus({
          isOpen: false,
          label: 'Currently Closed',
          subLabel: `Opens ${nextOpen} · Reservations open 24/7 online`,
          color: 'zinc',
        });
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText('18 Mercer Street, New York, NY 10013');
    setCopied(true);
    showToast('Address Copied', '18 Mercer Street copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=18+Mercer+Street+New+York+NY+10013';
  const appleMapsUrl = 'https://maps.apple.com/?q=18+Mercer+Street,+New+York,+NY+10013';

  return (
    <div className="rounded-3xl border border-[#c7a85c]/35 bg-[#12100d] p-6 sm:p-10 shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: Prominent Single-Click Navigation */}
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#c7a85c] mb-3">
            <Navigation size={13} />
            <span>Single-Click Directions & Location</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
            18 Mercer Street, Soho
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Nestled between Howard & Grand Streets in the historic Soho Cast-Iron District
          </p>

          {/* Quick action buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-3d flex items-center gap-2 rounded-xl px-5 py-3 text-[10px] uppercase tracking-[0.2em]"
            >
              <MapPin size={14} />
              <span>Open in Google Maps</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-3d flex items-center gap-2 rounded-xl border border-white/20 bg-[#181512] px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-white hover:border-[#c7a85c]"
            >
              <span>Apple Maps</span>
              <ExternalLink size={12} />
            </a>

            <button
              onClick={copyAddress}
              className="btn-pill-3d flex items-center gap-1.5 rounded-xl border border-white/15 bg-[#181512] px-3.5 py-3 text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white"
              title="Copy street address"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Transit & Valet indicators */}
          <div className="mt-6 pt-5 border-t border-white/10 grid sm:grid-cols-2 gap-3 text-xs text-white/60">
            <div className="flex items-start gap-2">
              <Car size={15} className="text-[#c7a85c] shrink-0 mt-0.5" />
              <span>Complimentary white-glove valet on Mercer St from 5:30 PM</span>
            </div>
            <div className="flex items-start gap-2">
              <Train size={15} className="text-[#c7a85c] shrink-0 mt-0.5" />
              <span>Subway: Canal St (N, Q, R, W, 6, J, Z) or Prince St</span>
            </div>
          </div>
        </div>

        {/* Right: Unified Hours Indicator & Kitchen Closing Times */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0c0a] p-6 sm:p-7 space-y-5">
          {/* Live Status Pill */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  status.color === 'emerald'
                    ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse'
                    : status.color === 'amber'
                    ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24] animate-pulse'
                    : 'bg-white/40'
                }`}
              />
              <span className="font-serif text-sm sm:text-base text-white font-medium">
                {status.label}
              </span>
            </div>

            <span className="text-[9px] uppercase tracking-wider text-[#c7a85c] font-mono">
              NYC Time
            </span>
          </div>

          <p className="text-xs text-white/50 -mt-2">
            {status.subLabel}
          </p>

          {/* Operating Hours Table */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-white/5 text-white/80">
              <span className="font-medium text-white">Tuesday – Thursday</span>
              <div className="text-right">
                <span className="text-[#e5c97d]">5:30 PM – 11:00 PM</span>
                <span className="text-[10px] text-white/40 block">Kitchen closes 10:00 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-white/5 text-white/80">
              <span className="font-medium text-white">Friday – Saturday</span>
              <div className="text-right">
                <span className="text-[#e5c97d]">5:00 PM – 11:45 PM</span>
                <span className="text-[10px] text-white/40 block">Kitchen closes 10:30 PM</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-1 text-white/50">
              <span>Sunday – Monday</span>
              <span className="italic">Closed for Hudson Valley Farm Sourcing & Private Buyouts</span>
            </div>
          </div>

          {/* Holiday Schedule Notice */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-white/60 bg-[#161310] p-3 rounded-xl border border-white/5">
            <Calendar size={14} className="text-[#c7a85c] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Upcoming Holiday Schedule:</strong> Open for Special Thanksgiving Harvest Tasting (Nov 26-29). New Year’s Eve Seatings open for booking 60 days in advance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
