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
import { convertTimeZone } from "@/function";

export function LineChartCustom({ data, timezone }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Temperature Line Chart</CardTitle>
                <CardDescription>{timezone ? `${timezone}` : 'No timezone selected'}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className=" sm:h-[200px] sm:w-[300px] md:h-[200px] md:w-[300px] lg:h-[400px] lg:w-[600px]">
                    <LineChart
                        data={data}
                        margin={{ top: 20 }}
                    >
                        <CartesianGrid vertical={false} />
                        {/* convertTimeZone */}
                        <XAxis
                            dataKey="created_at"
                            tickFormatter={(value) => {
                                const formattedDate = convertTimeZone(value, timezone);
                                return formattedDate;
                            }}
                        />
                        <YAxis />
                        <ChartTooltip className="bg-white"
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
