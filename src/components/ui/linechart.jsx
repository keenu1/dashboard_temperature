"use client"

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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

const chartConfig = {
    desktop: {
        label: "Temperature",
        color: "hsl(var(--chart-1))",
    },
};

export function LineChartCustom({ data, timezone }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Temperature Line Chart</CardTitle>
                <CardDescription>{timezone ? `${timezone}` : 'No timezone selected'}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-[600px]">
                    <LineChart
                        data={data}
                        margin={{ top: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="created_at"
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleString("default", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                    timeZone: timezone || "UTC" // Apply selected timezone or default to UTC
                                });
                            }}
                        />
                        <YAxis />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="value"
                            type="natural"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                {/* <div className="leading-none text-muted-foreground">
                    Showing temperature data
                </div> */}
            </CardFooter>
        </Card>
    );
}
