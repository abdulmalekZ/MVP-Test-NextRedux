export interface Report {
    paymentId: string;
    amount: number;
    projectId: string;
    gatewayId: string;
    gatewayName?: string;
    userIds: string[];
    modified: string;
    created: string;
}

export type DisplayType = "all" | "project" | "gateway" | "both";

export type OrganizedReportProjectType = {
    projectId?: string;
    gatewayId?: string;
    name: string;
    data: Report[];
};
