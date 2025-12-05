import React from "react";

type Filters = {
  category: string;
  type: string;
  status: string;
};

interface FiltersBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  categoryOptions: string[];
  typeOptions: string[];
  statusOptions: string[];
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div className="flex flex-col gap-1 text-xs">
    <span className="font-semibold text-slate-600">{label}</span>
    <select
      className="rounded-full border border-[#003262] bg-slate-50 px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#FDB515] focus:bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FiltersBar: React.FC<FiltersBarProps> = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  categoryOptions,
  typeOptions,
  statusOptions,
}) => {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left: Search + Filters */}
      <div className="flex flex-1 flex-col gap-3">
        {/* Global search */}
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search (all columns)…"
            className="w-full rounded-full border border-[#003262] bg-slate-50 px-4 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB515] focus:bg-white"
          />
          <span className="absolute left-3 top-2.5 text-slate-400 text-sm">
            🔍
          </span>
        </div>

        {/* Dropdown filters */}
        <div className="flex flex-wrap gap-4">
          <Select
            label="Category"
            value={filters.category}
            onChange={(v) => onFilterChange("category", v)}
            options={categoryOptions}
          />
          <Select
            label="Type"
            value={filters.type}
            onChange={(v) => onFilterChange("type", v)}
            options={typeOptions}
          />
          <Select
            label="Status"
            value={filters.status}
            onChange={(v) => onFilterChange("status", v)}
            options={statusOptions}
          />
        </div>
      </div>
    </section>
  );
};

export default FiltersBar;