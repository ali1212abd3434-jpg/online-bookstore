import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      sticky="top"
      className="shadow-sm border-bottom"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-primary"
          style={{ fontSize: "1.5rem" }}
        >
          📚 Online Bookstore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold px-3">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className="fw-semibold px-3">
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold px-3">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="fw-semibold px-3">
              Cart
            </Nav.Link>
          </Nav>

          <Nav>
            {!token && (
              <Nav.Link
                as={Link}
                to="/admin-login"
                className="fw-semibold text-success px-3"
              >
                Admin Login
              </Nav.Link>
            )}

            {token && (
              <>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  className="fw-semibold text-info px-3"
                >
                  Dashboard
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2 fw-bold"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
