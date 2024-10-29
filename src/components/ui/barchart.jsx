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
                <ChartContainer config={chartConfig} className=" sm:h-[200px] sm:w-[300px] md:h-[200px] md:w-[300px] lg:h-[400px] lg:w-[600px]">
                    <BarChart
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
                        <Bar dataKey="value" fill="var(--color-desktop)" radius={8} >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}

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
