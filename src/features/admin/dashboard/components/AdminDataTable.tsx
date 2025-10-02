"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, UserCheck, Users, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { UserDto } from "@/services/api/type";
import { ADMIN_ANIMATION_VARIANTS } from "@/common/constants/animation.constant";

interface TabConfig {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count: number;
}

interface AdminDataTableProps {
  columns: ColumnDef<UserDto>[];
  data: UserDto[];
  isLoading: boolean;
}

const AdminDataTable: React.FC<AdminDataTableProps> = ({ columns, data, isLoading }) => {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Memoize filtered data based on active tab
  const filteredData = useMemo(() => {
    switch (activeTab) {
      case "pending":
        return data.filter((user) => user.role === "TUTOR" && user.status === "PENDING");
      case "approved":
        return data.filter((user) => user.role === "TUTOR" && user.status === "APPROVED");
      case "all":
        return data;
      default:
        return data;
    }
  }, [activeTab, data]);

  // Memoize tab configurations
  const tabs: TabConfig[] = useMemo(() => [
    {
      key: "pending",
      label: "Pending Tutors",
      icon: Clock,
      color: "orange",
      count: data.filter((user) => user.role === "TUTOR" && user.status === "PENDING").length,
    },
    {
      key: "approved",
      label: "Approved Tutors",
      icon: UserCheck,
      color: "green",
      count: data.filter((user) => user.role === "TUTOR" && user.status === "APPROVED").length,
    },
    {
      key: "all",
      label: "All Users",
      icon: Users,
      color: "blue",
      count: data.length,
    },
  ], [data]);

  // Memoize table configuration
  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 10, // Giảm page size để tăng performance
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  // Memoize tab change handler
  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey as any);
  }, []);

  // Memoize global filter change handler
  const handleGlobalFilterChange = useCallback((value: string) => {
    setGlobalFilter(value);
  }, []);

  if (isLoading) {
    return (
      <div className="border-0 rounded-4xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-0 rounded-4xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200/50 dark:border-gray-700/50">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`relative py-4 px-1 font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? `text-${tab.color}-600 dark:text-${tab.color}-400`
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <Badge
                variant={activeTab === tab.key ? "default" : "secondary"}
                className={`${
                  activeTab === tab.key
                    ? `bg-${tab.color}-100 text-${tab.color}-700 dark:bg-${tab.color}-900/30 dark:text-${tab.color}-300`
                    : ""
                }`}
              >
                {tab.count}
              </Badge>

              {/* Active tab indicator */}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 rounded-full`}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Table Controls */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={globalFilter ?? ""}
                onChange={(event) => handleGlobalFilterChange(String(event.target.value))}
                className="pl-10 max-w-sm"
              />
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {table.getFilteredRowModel().rows.length} user(s) found
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="px-6 pb-6">
        <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50/50 dark:bg-gray-800/50">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-gray-700 dark:text-gray-300"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                    No users found for this category
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDataTable;
