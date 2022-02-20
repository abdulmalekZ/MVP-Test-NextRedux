import { createSlice } from "@reduxjs/toolkit";
import { Gateway } from "src/interfaces/Gateway";
import { Project } from "src/interfaces/Project";

export interface IFilters {
    project: null | Project;
    gateway: null | Gateway;
}

const initialState: IFilters = {
    project: null,
    gateway: null,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilterProject: (state, payload) => {
            state.project = payload.payload;
        },
        setFilterGateway: (state, payload) => {
            state.gateway = payload.payload;
        },
    },
});

export const { setFilterProject, setFilterGateway } = filtersSlice.actions;

export default filtersSlice.reducer;
