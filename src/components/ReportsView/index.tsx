import { setGateways, setProjects, setUsers } from "@redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Filters } from "./filters";
import { Menu } from "./menu";
import { Report } from "./report";
import { useSelector } from "react-redux";
import axios from "axios";
import { State } from "src/interfaces/State";
import { DisplayType } from "src/interfaces/Report";
import { calculateType } from "src/helpers/types";

export const ReportsView: React.FC = () => {
    const dispatch = useDispatch();
    const reports: State = useSelector((state: any) => state.reports);
    const filters = useSelector((state: any) => state.filters);
    const [type, setType] = useState<DisplayType>("all");

    useEffect(() => {
        if (reports.projects.length === 0) {
            axios
                .get("http://178.63.13.157:8090/mock-api/api/gateways")
                .then((data) => {
                    const gateways = data.data.data;
                    dispatch(setGateways(gateways));
                });
            axios
                .get("http://178.63.13.157:8090/mock-api/api/users")
                .then((data) => {
                    const users = data.data.data;
                    dispatch(setUsers(users));
                });
            axios
                .get("http://178.63.13.157:8090/mock-api/api/projects")
                .then((data) => {
                    const projects = data.data.data;
                    dispatch(setProjects(projects));
                });
        }
    }, []);

    useEffect(() => {
        setType(calculateType(filters));
    }, [filters]);

    return (
        <div className="mainContainer">
            <Menu />
            <div className="content">
                <div className="containerHeader">
                    <div className="title">
                        <h1>Reports</h1>
                        <span className="sub">
                            Easily generate a report of your transactions
                        </span>
                    </div>
                    <Filters />
                </div>
                <div className="containerContent">
                    <Report type={type} />
                </div>
            </div>
        </div>
    );
};
