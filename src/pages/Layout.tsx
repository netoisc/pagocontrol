import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Layout.css";

const Layout =() =>{

    return (
        <>
        <NavBar />
        <main className="main-content text-start">
            <Container className="container-margin-top">
                <Outlet />
            </Container>
        </main>
        </>
    );
};

export default Layout;
