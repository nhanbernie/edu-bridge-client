"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { useTranslations } from "next-intl";

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
// Removed constants import - using theme system instead
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
  const t = useTranslations("tutor.dashboard.transactionChart");

  if (isLoading) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground leading-tight">{t("title")}</h2>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">{t("loading")}</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (transactionsError) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground leading-tight">{t("title")}</h2>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">Lỗi tải dữ liệu</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-destructive">{t("error")}</div>
        </div>
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground leading-tight">{t("title")}</h2>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed">{t("subtitle")}</p>
        </div>
        <div className="flex items-center justify-center h-74">
          <div className="text-center">
            <div className="text-muted-foreground">{t("empty.title")}</div>
            <div className="text-muted-foreground/70 text-sm mt-1">{t("empty.description")}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-2xl p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground leading-tight">{t("title")}</h2>
        <p className="text-muted-foreground mt-3 text-lg leading-relaxed">{t("subtitle")}</p>
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
        <div className="flex gap-2 leading-relaxed font-medium text-foreground">
          {growthPercentage >= 0 ? (
            <>
              {t("growth.positive", { percentage: growthPercentage })}{" "}
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("growth.negative", { percentage: Math.abs(growthPercentage) })}{" "}
              <TrendingUp className="h-4 w-4 rotate-180" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-relaxed">{t("footer")}</div>
      </div>
    </div>
  );
}
