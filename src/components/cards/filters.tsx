import { Calendar } from "@components/icons";
import { setFilterGateway, setFilterProject, setReports } from "@redux/actions";
import React, { forwardRef, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Gateway } from "src/interfaces/Gateway";
import { Project } from "src/interfaces/Project";
import { State } from "src/interfaces/State";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const Filters: React.FC = () => {
    const [startDate, setStartDate] = useState<null | Date>(null);
    const [endDate, setEndDate] = useState<null | Date>(null);
    const [projectSelected, setProjectSelected] = useState<null | Project>(
        null,
    );
    const [gatewaySelected, setGatewaySelected] = useState<null | Gateway>(
        null,
    );
    // @ts-expect-error incompatible library
    const FromDateInput = forwardRef(({ value, onClick }, ref) => (
        // @ts-expect-error incompatible library
        <div onClick={onClick} ref={ref} className="filter">
            From {value === "" ? "Date" : value} <Calendar />
        </div>
    ));

    // @ts-expect-error incompatible library
    const ToDateInput = forwardRef(({ value, onClick }, ref) => (
        // @ts-expect-error incompatible library
        <div onClick={onClick} ref={ref} className="filter">
            To {value === "" ? "Date" : value} <Calendar />
        </div>
    ));
    // @ts-check
    const dispatch = useDispatch();
    const reports: State = useSelector((state: any) => state.reports);

    const generateReport = () => {
        if (startDate && endDate) {
            dispatch(setFilterProject(projectSelected));
            dispatch(setFilterGateway(gatewaySelected));
            const body = {
                from: startDate.toISOString().split("T")[0],
                to: endDate.toISOString().split("T")[0],
                projectId: projectSelected ? projectSelected.projectId : null,
                gatewayId: gatewaySelected ? gatewaySelected.gatewayId : null,
            };
            axios
                .post("http://178.63.13.157:8090/mock-api/api/report", body)
                .then((data) => {
                    dispatch(setReports(data.data.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="filters">
            <DropdownButton
                id="dropdown-basic-button"
                title={projectSelected ? projectSelected.name : "All Projects"}
            >
                <Dropdown.Item
                    onClick={() => setProjectSelected(null)}
                    href="#"
                >
                    All Projects
                </Dropdown.Item>
                {reports.projects.length > 0 &&
                    reports.projects.map((project) => (
                        <Dropdown.Item
                            key={project.projectId}
                            onClick={() => setProjectSelected(project)}
                            href="#"
                        >
                            {project.name}
                        </Dropdown.Item>
                    ))}
            </DropdownButton>
            <DropdownButton
                id="dropdown-basic-button"
                title={gatewaySelected ? gatewaySelected.name : "All Gateways"}
            >
                <Dropdown.Item
                    href="#"
                    onClick={() => setGatewaySelected(null)}
                >
                    All Gateways
                </Dropdown.Item>

                {reports.gateways.length > 0 &&
                    reports.gateways.map((gateway) => (
                        <Dropdown.Item
                            key={gateway.gatewayId}
                            onClick={() => setGatewaySelected(gateway)}
                            href="#"
                        >
                            {gateway.name}
                        </Dropdown.Item>
                    ))}
            </DropdownButton>
            <DatePicker
                openToDate={new Date("2021/01/01")}
                minDate={new Date("2021/01/01")}
                maxDate={new Date("2021/12/31")}
                className="filter"
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                customInput={<FromDateInput />}
            />
            <DatePicker
                minDate={startDate ? startDate : new Date("2021/01/02")}
                maxDate={new Date("2021/12/31")}
                openToDate={new Date("2021/12/31")}
                className="filter"
                dateFormat="yyyy-MM-dd"
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
                customInput={<ToDateInput />}
            />
            <div onClick={() => generateReport()} className="filter generate">
                Generate Report
            </div>
        </div>
    );
};
