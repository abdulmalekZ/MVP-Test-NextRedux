import React, { useEffect, useState } from "react";
import { Item } from "./item";
import { PieChart } from "react-minimal-pie-chart";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/interfaces/State";
import { NoData } from "./noData";
import { DisplayType, OrganizedReportProjectType } from "src/interfaces/Report";
import { calculateTotal, reportType } from "src/helpers/types";
import { Project } from "./project";
import { Both } from "./both";
import { Gateway } from "./gateway";

const itemsChart = [
    { color: "#A259FF", class: "purple" },
    { color: "#6497B1", class: "blue" },
    { color: "#FFC107", class: "yellow" },
    { color: "#F24E1E", class: "red" },
];

interface ChartData {
    name: string;
    total: number;
}

export const Report: React.FC<{ type: DisplayType }> = ({ type }) => {
    const dispatch = useDispatch();
    const [organized, setOrganized] = useState<OrganizedReportProjectType[]>(
        [],
    );
    const [chartData, setChartData] = useState<null | ChartData[]>(null);
    const reports: State = useSelector((state: any) => state.reports);
    const filters = useSelector((state: any) => state.filters);

    useEffect(() => {
        if (reports.reports.length > 0) {
            setOrganized(reportType(type, reports));
        }
    }, [reports]);

    useEffect(() => {
        setChartData(prepareChart(organized));
    }, [organized]);

    const prepareChart = (org: OrganizedReportProjectType[]) => {
        const chartData = [];
        for (const o of org) {
            chartData.push({
                name: o.name,
                total: calculateTotal(o.data),
            });
        }
        return chartData;
    };

    const calculateTotalOrg = (org: OrganizedReportProjectType[]) => {
        let total = 0;
        for (const o of org) {
            for (const d of o.data) {
                total += d.amount;
            }
        }
        return total;
    };

    const printReport = (organized: OrganizedReportProjectType[]) => {
        let output;
        switch (type) {
            case "all":
                output = organized.map((org) => (
                    <Project key={org.projectId} project={org} />
                ));
                break;
            case "gateway":
                output = organized.map((org) => (
                    <Project key={org.projectId} project={org} hideGateway />
                ));
                break;
            case "project":
                output = organized.map((org) => (
                    <Gateway key={org.gatewayId} gateway={org} />
                ));
                break;
            case "both":
                output = <Both report={organized[0]?.data} />;
                break;
        }
        return output;
    };

    const getChartData = (chartData: ChartData[]) => {
        const d = chartData.map((c, index) => {
            return {
                value: c.total,
                title: c.name,
                color: itemsChart[index].color,
            };
        });
        return d;
    };
    return (
        <>
            {reports.reports.length > 0 ? (
                <>
                    <div
                        className={`report ${
                            type === "gateway" || type === "project"
                                ? "half"
                                : "full"
                        }`}
                    >
                        <div className="reportCard">
                            <div className="type">
                                {filters.project
                                    ? filters.project.name
                                    : "All Projects"}{" "}
                                |{" "}
                                {filters.gateway
                                    ? filters.gateway.name
                                    : "All Gateways"}
                            </div>
                            {organized && printReport(organized)}
                        </div>
                        {type === "all" ||
                            (type === "both" && (
                                <div className="total">
                                    TOTAL:{" "}
                                    {calculateTotalOrg(
                                        organized,
                                    ).toLocaleString()}{" "}
                                    USD
                                </div>
                            ))}
                    </div>
                    {type === "gateway" || type === "project" ? (
                        <div className="graph half">
                            <div className="header">
                                {chartData &&
                                    chartData?.length > 0 &&
                                    chartData?.map((d, index) => (
                                        <div key={d.name} className="item">
                                            <div
                                                className={`box ${itemsChart[index].class}`}
                                            ></div>
                                            {d.name}
                                        </div>
                                    ))}
                            </div>
                            <div className="pie">
                                {chartData && (
                                    <PieChart
                                        style={{ height: 270, width: 270 }}
                                        lineWidth={50}
                                        labelPosition={75}
                                        label={({ dataEntry }) =>
                                            `${Math.round(
                                                dataEntry.percentage,
                                            )}%`
                                        }
                                        labelStyle={{
                                            fontSize: "6px",
                                            fill: "#fff",
                                        }}
                                        data={getChartData(chartData)}
                                    />
                                )}
                            </div>
                            <div className="total">
                                TOTAL:{" "}
                                {calculateTotalOrg(organized).toLocaleString()}{" "}
                                USD
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <NoData />
            )}
        </>
    );
};
