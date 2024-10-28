"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
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

import { convertTimeZone } from "@/function";

export function BarChartCustom({ data, timezone }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Temperature Bar Chart</CardTitle>
                <CardDescription>{timezone ? `${timezone}` : 'No timezone selected'}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px] w-[600px]">
                    <BarChart
                        data={data}
                        margin={{ top: 20 }}
                        data-testid="temperature-bar-chart" // Adding data-testid for the chart
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="created_at"
                            tickFormatter={(value) => {
                                const formattedDate = convertTimeZone(value, timezone);
                                return formattedDate;
                            }}
                            data-testid="x-axis" // Optional data-testid for X-axis
                        />
                        <YAxis data-testid="y-axis" /> {/* Optional data-testid for Y-axis */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" fill="var(--color-desktop)" radius={8} data-testid="temperature-bar">
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                data-testid="temperature-labels" // Adding data-testid for the labels
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* Additional footer content can be added here */}
            </CardFooter>
        </Card>
    );
}
