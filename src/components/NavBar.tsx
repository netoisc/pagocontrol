import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const [ isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const { authStatus, signOut } = useAuthenticator((context)=> [
        context.authStatus,
    ]);

    useEffect(() => {
        console.log("authStatus from useAuthenticator", authStatus);
        if(authStatus != "configuring"){
            setIsSignedIn(authStatus === "authenticated");
        }
    }, [authStatus]);

    const handleSignIn = () => {
        navigate("/sign-in");
    };

    return (
        <>
        <Navbar className="bg-primary" fixed="top" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    Pagos Control
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {
                        isSignedIn && (
                            <Nav className="">
                                <Nav.Link href="#home">Registrar pago</Nav.Link>
                                <Nav.Link href="#link">Administrar</Nav.Link>
                                <Nav.Link href="#" onClick={signOut}>Salir</Nav.Link>
                            </Nav>


                        )
                    }
                    {
                        !isSignedIn && (
                            <Button variant="dark" onClick={handleSignIn}>
                                Entrar
                            </Button>
                        )
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )

}

export default NavBar;
