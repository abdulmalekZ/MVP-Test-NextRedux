import React from "react";
import { Table } from "react-bootstrap";
import { Report } from "src/interfaces/Report";

export const Both: React.FC<{
    report: Report[];
}> = ({ report }) => {
    return (
        <>
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
                        {report?.length > 0 &&
                            report
                                .sort(function (a, b) {
                                    return (
                                        new Date(a.created).getTime() -
                                        new Date(b.created).getTime()
                                    );
                                })
                                .map((r) => (
                                    <tr key={r.paymentId}>
                                        <td>{r.created}</td>
                                        <td>{r.paymentId}</td>
                                        <td>{r.amount.toLocaleString()} USD</td>
                                    </tr>
                                ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};
