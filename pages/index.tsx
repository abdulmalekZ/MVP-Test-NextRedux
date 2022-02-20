import React from "react";

import { Header, Main, Footer, Cards } from "@components";

const Home: React.FC = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <Cards />
            <Footer />
        </div>
    );
};

export default Home;
