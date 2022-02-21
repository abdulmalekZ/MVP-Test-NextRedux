import { NoDataIcon } from "@components/icons";
import React from "react";

export const NoData: React.FC = () => {
    return (
        <div className="noData">
            <div className="text">
                <h1>No Reports</h1>
                <p>
                    Currently you have no data for the reports to be generated.
                    Once you start generating traffic through the Balance
                    application the reports will be shown.
                </p>
            </div>
            <NoDataIcon />
        </div>
    );
};
