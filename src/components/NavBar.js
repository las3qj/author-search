import {Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Library App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">My Library</Link></Nav.Link>
                    <Nav.Link><Link to="/search">Search for books</Link></Nav.Link>
                </Nav>
        </Navbar>
    );
}

export default NavBar;