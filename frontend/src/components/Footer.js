import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-dark border-top shadow-sm mt-5">
      <Container className="py-4 text-center">
        <h5 className="fw-bold text-primary mb-2">📚 Online Bookstore</h5>
        <p className="text-muted mb-1">
          &copy; {new Date().getFullYear()} Online Bookstore. All rights reserved.
        </p>
        <small className="text-secondary">
          Designed with ❤️ for book lovers
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
