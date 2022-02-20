import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Report } from "src/interfaces/Report";

export const Item: React.FC<{ report: Report }> = ({ report }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <>
            <div onClick={() => setExpanded(!expanded)} className="item">
                <span>title</span>
                <span>total: 2344</span>
            </div>
            {expanded && (
                <div className="itemDetails">
                    <Table striped borderless hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Gateway</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01/21/2021</td>
                                <td>Gateway 1</td>
                                <td>a7786</td>
                                <td>34234.0 USD</td>
                            </tr>
                            <tr>
                                <td>01/21/2021</td>
                                <td>Gateway 1</td>
                                <td>a7786</td>
                                <td>34234.0 USD</td>
                            </tr>
                            <tr>
                                <td>01/21/2021</td>
                                <td>Gateway 1</td>
                                <td>a7786</td>
                                <td>34234.0 USD</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
};
