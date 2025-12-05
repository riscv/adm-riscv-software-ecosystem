import React from "react";

interface HeaderProps {
  secondsRemaining: number;
  totalCount: number;
}

const formatSeconds = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const Header: React.FC<HeaderProps> = ({ secondsRemaining, totalCount }) => {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <img
          src={`${import.meta.env.BASE_URL}riscv-logo.png`}
          alt="RISC-V logo"
          className="h-10 w-auto"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-[#003262]">
            Software Ecosystem
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Tracking enablement status across key software packages. {""}
            {/* <span className="font-medium">{totalCount}</span> packages total. */}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-full">
          <span className="uppercase tracking-wide">Auto-refresh</span>
          <span className="font-semibold text-[#003262]">
            {formatSeconds(secondsRemaining)}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;