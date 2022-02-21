import React from "react";

import { Header, Footer, ReportsView } from "@components";

const Home: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <ReportsView />
            <Footer />
        </div>
    );
};

export default Home;
