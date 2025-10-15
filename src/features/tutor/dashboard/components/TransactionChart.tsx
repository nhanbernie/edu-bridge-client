"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CARD_BASE, ROUNDED, CARD_TEXT } from "@/common/constants/css/card.constant";
import { useTransactionChart } from "@/features/tutor/dashboard/hooks/useTransactionChart";

export const description = "Biểu đồ giao dịch";

const chartConfig = {
  earnings: {
    label: "Thu nhập",
    color: "var(--chart-1)",
  },
  spent: {
    label: "Chi tiêu",
    color: "var(--chart-2)",
  },
  net: {
    label: "Lợi nhuận",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function TransactionChart() {
  const { chartData, growthPercentage, isLoading, transactionsError } = useTransactionChart();

  if (isLoading) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <div className="mb-6">
          <h2 className={CARD_TEXT.TITLE}>Biểu đồ giao dịch</h2>
          <p className={CARD_TEXT.SUBTITLE}>Đang tải dữ liệu giao dịch...</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (transactionsError) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <div className="mb-6">
          <h2 className={CARD_TEXT.TITLE}>Biểu đồ giao dịch</h2>
          <p className={CARD_TEXT.SUBTITLE}>Lỗi tải dữ liệu</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Không thể tải dữ liệu giao dịch</div>
        </div>
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <div className="mb-6">
          <h2 className={CARD_TEXT.TITLE}>Biểu đồ giao dịch</h2>
          <p className={CARD_TEXT.SUBTITLE}>Tổng quan giao dịch hàng tháng</p>
        </div>
        <div className="flex items-center justify-center h-74">
          <div className="text-center">
            <div className="text-gray-500">Chưa có thu nhập</div>
            <div className="text-gray-400 text-sm mt-1">Dữ liệu giao dịch sẽ hiển thị ở đây</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
      <div className="mb-6">
        <h2 className={CARD_TEXT.TITLE}>Biểu đồ giao dịch</h2>
        <p className={CARD_TEXT.SUBTITLE}>Tổng quan giao dịch hàng tháng</p>
      </div>

      <div className="mb-6">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="earnings"
              type="natural"
              stroke="var(--color-earnings)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-earnings)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      <div className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-relaxed font-medium text-gray-900 dark:text-white">
          {growthPercentage >= 0 ? (
            <>
              Thu nhập tăng {growthPercentage}% tháng này <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Thu nhập giảm {Math.abs(growthPercentage)}% tháng này{" "}
              <TrendingUp className="h-4 w-4 rotate-180" />
            </>
          )}
        </div>
        <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Hiển thị tổng thu nhập trong 6 tháng gần nhất
        </div>
      </div>
    </div>
  );
}
