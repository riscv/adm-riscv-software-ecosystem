import React, { useMemo } from "react";

interface StatusDonutProps {
  data: any[];
}

const STATUS_COLORS: Record<string, string> = {
  Enabled: "#D4F5DF",       // soft green
  "In Progress": "#D6E4FF", // soft blue
  TBD: "#E5F3FF",           // very light cyan/blue
  Optimized: "#EBDDFF",     // soft lavender
};

const StatusDonut: React.FC<StatusDonutProps> = ({ data }) => {
  const { segments, total } = useMemo(() => {
    const counts: Record<string, number> = {};

    data.forEach((item) => {
      const status = item.status || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
    });

    const total = data.length || 0;
    const entries = Object.entries(counts);

    if (!total || !entries.length) {
      return { segments: [], total: 0 };
    }

    // Compute base fractions by count
    const base = entries.map(([status, count]) => ({
      status,
      count,
      fraction: count / total,
    }));

    // Enforce a minimum visual fraction so segments are never too small to read
    const MIN_FRACTION = 0.12; // 12% minimum width per segment

    const small = base.filter((b) => b.fraction < MIN_FRACTION);
    const large = base.filter((b) => b.fraction >= MIN_FRACTION);

    let segments;

    // If the minimum for all segments would exceed 100%, just distribute evenly
    if (MIN_FRACTION * base.length >= 1) {
      const equalFraction = 1 / base.length;
      segments = base.map((b) => ({
        status: b.status,
        count: b.count,
        percentage: equalFraction * 100,
        color: STATUS_COLORS[b.status] || "#CBD5E1",
      }));
    } else {
      const forcedSmallTotal = MIN_FRACTION * small.length;
      const remaining = 1 - forcedSmallTotal;
      const largeFractionSum = large.reduce((sum, b) => sum + b.fraction, 0);

      segments = base.map((b) => {
        let fraction;
        if (b.fraction < MIN_FRACTION) {
          fraction = MIN_FRACTION;
        } else if (largeFractionSum > 0) {
          fraction = (b.fraction / largeFractionSum) * remaining;
        } else {
          fraction = 1 / base.length;
        }

        return {
          status: b.status,
          count: b.count,
          percentage: fraction * 100,
          color: STATUS_COLORS[b.status] || "#CBD5E1",
        };
      });
    }

    return { segments, total };
  }, [data]);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-100 px-4 py-3">
      <div className="flex items-center gap-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex w-full rounded-xl overflow-hidden">
            {segments.map((seg) => (
              <div
                key={seg.status}
                style={{
                  width: `${seg.percentage}%`,
                  backgroundColor: seg.color,
                }}
                className="flex items-center justify-center h-10 px-2"
              >
                <div className="text-center text-xs md:text-sm font-semibold text-[#003262]">
                  <div>
                    {seg.status} ({seg.count})
                  </div>
                  <div className="text-[10px] md:text-xs font-normal">
                    {seg.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-32 text-center">
          <div className="text-3xl font-bold text-[#003262]">{total}</div>
          <span className="block text-xs font-normal text-slate-500">
            total packages
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatusDonut;