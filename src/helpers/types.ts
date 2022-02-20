import { IFilters } from "@redux/slices/filters";
import { report } from "process";
import { useSelector } from "react-redux";
import { Gateway } from "src/interfaces/Gateway";
import { Project } from "src/interfaces/Project";
import {
    DisplayType,
    OrganizedReportProjectType,
    Report,
} from "src/interfaces/Report";
import { State } from "src/interfaces/State";

export const calculateType = (filters: IFilters): DisplayType => {
    let type: DisplayType = "all";
    if (filters.gateway && filters.project) {
        type = "both";
    } else if (filters.gateway || filters.project) {
        type = filters.gateway
            ? "gateway"
            : filters.project
            ? "project"
            : "all";
    }
    return type;
};

export const reportType = (type: DisplayType, reports: State) => {
    let reportsOrganized;
    switch (type) {
        case "all":
        case "both":
            reportsOrganized = getAllOrganizedObject(
                reports.reports,
                reports.projects,
                reports.gateways,
            );
            break;
        case "project":
            reportsOrganized = getAllOrganizedProjectObject(
                reports.reports,
                reports.projects,
                reports.gateways,
            );
            break;
        case "gateway":
            reportsOrganized = getAllOrganizedGatewayObject(
                reports.reports,
                reports.projects,
            );
            break;
    }
    return reportsOrganized || [];
};

const getAllOrganizedGatewayObject = (
    reports: Report[],
    projects: Project[],
): OrganizedReportProjectType[] => {
    const organized = [];
    for (const report of reports) {
        let done = false;
        for (const org of organized) {
            if (report.projectId === org.projectId) done = true;
        }
        if (!done) {
            const arr = [];
            for (const obj of reports) {
                if (
                    obj.gatewayId === report.gatewayId &&
                    obj.projectId === report.projectId
                ) {
                    const newObj = { ...obj };
                    arr.push(newObj);
                }
            }
            const orgObj = {
                projectId: report.projectId,
                name: getProjectName(report.projectId, projects),
                data: arr,
            };
            organized.push(orgObj);
        }
    }
    return organized.reverse();
};

const getAllOrganizedProjectObject = (
    reports: Report[],
    projects: Project[],
    gateways: Gateway[],
): OrganizedReportProjectType[] => {
    const organized = [];
    for (const gateway of gateways) {
        let done = false;
        for (const org of organized) {
            if (gateway.gatewayId === org.gatewayId) done = true;
        }
        if (!done) {
            const arr = [];
            for (const obj of reports) {
                if (obj.gatewayId === gateway.gatewayId) {
                    arr.push(obj);
                }
            }
            const orgObj = {
                gatewayId: gateway.gatewayId,
                name: getGatewayName(gateway.gatewayId, gateways),
                data: arr,
            };
            organized.push(orgObj);
        }
    }
    return organized;
};

const getAllOrganizedObject = (
    reports: Report[],
    projects: Project[],
    gateways: Gateway[],
): OrganizedReportProjectType[] => {
    const organized = [];
    for (const report of reports) {
        let done = false;
        for (const org of organized) {
            if (report.projectId === org.projectId) done = true;
        }
        if (!done) {
            const arr = [];
            for (const obj of reports) {
                if (obj.projectId === report.projectId) {
                    const newObj = { ...obj };
                    newObj.gatewayName = getGatewayName(
                        newObj.gatewayId,
                        gateways,
                    );
                    arr.push(newObj);
                }
            }
            const orgObj = {
                projectId: report.projectId,
                name: getProjectName(report.projectId, projects),
                data: arr,
            };
            organized.push(orgObj);
        }
    }
    return organized;
};

export const getProjectName = (id: string, projects: Project[]) => {
    for (const proj of projects) {
        if (proj.projectId == id) {
            return proj.name;
        }
    }
    return "";
};

export const getGatewayName = (id: string, gateways: Gateway[]) => {
    for (const gate of gateways) {
        if (gate.gatewayId == id) {
            return gate.name;
        }
    }
    return "";
};

export const calculateTotal = (data: Report[]) => {
    let total = 0;
    for (const rep of data) {
        total += rep.amount;
    }
    return total;
};
