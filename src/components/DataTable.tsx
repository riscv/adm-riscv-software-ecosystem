import React from "react";

const DataTable = ({
  data,
  fullLength,
  page,
  setPage,
  totalPages,
  pageSize,
  showAll,
  setShowAll,
  onExportCsv,
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  const renderSortIcon = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return <span className="text-[10px] text-slate-400">↕</span>;
    }
    return (
      <span className="text-[10px] text-slate-500">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">
            All Packages
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {showAll
              ? `Showing all ${fullLength} records`
              : `Showing ${(page - 1) * pageSize + 1}–${Math.min(
                  page * pageSize,
                  fullLength
                )} of ${fullLength}`}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={onExportCsv}
            className="inline-flex items-center gap-2 rounded-full border border-[#003262]/30 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#003262] hover:bg-[#003262]/10 transition-colors"
          >
            Save as CSV
          </button>

          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span>Show all</span>
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${
                showAll ? "bg-[#003262]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                  showAll ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {!showAll && (
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-2 py-1 rounded-full border text-xs ${
                  page === 1
                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Prev
              </button>
              <span className="text-slate-500">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-2 py-1 rounded-full border text-xs ${
                  page === totalPages
                    ? "border-slate-200 text-slate-300 cursor-not-allowed"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-t border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                <button
                  type="button"
                  onClick={() => onSortChange("category")}
                  className="flex items-center gap-1 hover:text-slate-700"
                >
                  <span>Category</span>
                  {renderSortIcon("category")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                <button
                  type="button"
                  onClick={() => onSortChange("software")}
                  className="flex items-center gap-1 hover:text-slate-700"
                >
                  <span>Software</span>
                  {renderSortIcon("software")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                <button
                  type="button"
                  onClick={() => onSortChange("type")}
                  className="flex items-center gap-1 hover:text-slate-700"
                >
                  <span>Type</span>
                  {renderSortIcon("type")}
                </button>
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500">
                <button
                  type="button"
                  onClick={() => onSortChange("status")}
                  className="flex items-center gap-1 hover:text-slate-700"
                >
                  <span>Status</span>
                  {renderSortIcon("status")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-6 py-3 text-sm text-slate-700 whitespace-nowrap">
                  {row.category}
                </td>
                <td className="px-6 py-3 text-sm text-[#003262] whitespace-nowrap">
                  <a
                    href={row.riscvEnablement}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium text-[#003262]"
                  >
                    {row.software}
                    <span className="ml-1 text-xs text-[#003262]">↗</span>
                  </a>
                </td>
                <td className="px-6 py-3 text-sm text-slate-700 whitespace-nowrap">
                  {row.type}
                </td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      row.status === "Enabled"
                        ? "bg-emerald-50 text-emerald-700"
                        : row.status === "In Progress"
                        ? "bg-sky-50 text-sky-700"
                        : row.status === "Optimized"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}

            {!data.length && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  No records match the current filters or search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataTable;