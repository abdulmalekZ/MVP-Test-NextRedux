import { createSlice } from "@reduxjs/toolkit";
import { Gateway } from "src/interfaces/Gateway";
import { Project } from "src/interfaces/Project";
import { Report } from "src/interfaces/Report";
import { User } from "src/interfaces/User";

interface IReports {
    projects: Project[];
    gateways: Gateway[];
    users: User[];
    reports: Report[];
}

const initialState: IReports = {
    projects: [],
    gateways: [],
    users: [],
    reports: [],
};

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        setProjects: (state, payload) => {
            state.projects = payload.payload;
        },
        setGateways: (state, payload) => {
            state.gateways = payload.payload;
        },
        setUsers: (state, payload) => {
            state.users = payload.payload;
        },
        setReports: (state, payload) => {
            state.reports = payload.payload;
        },
    },
});

export const { setProjects, setGateways, setUsers, setReports } =
    reportsSlice.actions;

export default reportsSlice.reducer;
