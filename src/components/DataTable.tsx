"use client";

import React from "react";

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  actions?: (row: Record<string, any>) => React.ReactNode;
}

export default function DataTable({ columns, data, actions }: DataTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              {columns.map((col) => (
                <th key={col.key} className={`px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold ${col.width || ""}`}>
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-semibold">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-gray-700">
                    {row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {data.map((row, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-4 space-y-2">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between items-start">
                <span className="text-xs font-semibold text-gray-600 uppercase">{col.label}:</span>
                <span className="text-sm text-gray-900 text-right ml-2">{row[col.key]}</span>
              </div>
            ))}
            {actions && (
              <div className="pt-2 border-t border-gray-200 flex justify-end gap-2">
                {actions(row)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
