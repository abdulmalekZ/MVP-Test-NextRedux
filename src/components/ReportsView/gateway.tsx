import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { calculateTotal } from "src/helpers/types";
import { OrganizedReportProjectType } from "src/interfaces/Report";

export const Gateway: React.FC<{
    gateway: OrganizedReportProjectType;
}> = ({ gateway }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div onClick={() => setExpanded(!expanded)} className="item">
                <span>{gateway.name}</span>
                <span>
                    TOTAL:{" "}
                    {calculateTotal(gateway.data).toLocaleString() + " USD"}
                </span>
            </div>
            {expanded && (
                <div className="itemDetails">
                    <Table striped borderless hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gateway?.data?.length > 0 &&
                                gateway.data
                                    .sort(function (a, b) {
                                        return (
                                            new Date(a.created).getTime() -
                                            new Date(b.created).getTime()
                                        );
                                    })
                                    .map((g) => (
                                        <tr key={g.paymentId}>
                                            <td>{g.created}</td>
                                            <td>{g.paymentId}</td>
                                            <td>
                                                {g.amount.toLocaleString()} USD
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
