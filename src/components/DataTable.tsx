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
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
            {columns.map((col) => (
              <th key={col.key} className={`px-6 py-3 text-left text-sm font-semibold ${col.width || ""}`}>
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                  {row[col.key]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
