import { Gateway } from "./Gateway";
import { Project } from "./Project";
import { Report } from "./Report";
import { User } from "./User";

export interface State {
    projects: Project[];
    gateways: Gateway[];
    users: User[];
    reports: Report[];
}
