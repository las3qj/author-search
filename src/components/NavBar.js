import {Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Library App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/search">Search</Link></Nav.Link>
                    <Nav.Link><Link to="/library">My library</Link></Nav.Link>
                </Nav>
        </Navbar>
    );
}

export default NavBar;