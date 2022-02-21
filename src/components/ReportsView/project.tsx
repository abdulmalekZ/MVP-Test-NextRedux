import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { calculateTotal } from "src/helpers/types";
import { OrganizedReportProjectType } from "src/interfaces/Report";

export const Project: React.FC<{
    project: OrganizedReportProjectType;
    hideGateway?: boolean;
}> = ({ project, hideGateway = false }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div onClick={() => setExpanded(!expanded)} className="item">
                <span>{project.name}</span>
                <span>
                    TOTAL:{" "}
                    {calculateTotal(project.data).toLocaleString() + " USD"}
                </span>
            </div>
            {expanded && (
                <div className="itemDetails">
                    <Table striped borderless hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                {!hideGateway && <th>Gateway</th>}
                                <th>Transaction ID</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project?.data?.length > 0 &&
                                project.data
                                    .sort(function (a, b) {
                                        return (
                                            new Date(a.created).getTime() -
                                            new Date(b.created).getTime()
                                        );
                                    })
                                    .map((report) => (
                                        <tr key={report.paymentId}>
                                            <td>{report.created}</td>
                                            {!hideGateway && (
                                                <td>{report.gatewayName}</td>
                                            )}
                                            <td>{report.paymentId}</td>
                                            <td>
                                                {report.amount.toLocaleString()}{" "}
                                                USD
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
};
