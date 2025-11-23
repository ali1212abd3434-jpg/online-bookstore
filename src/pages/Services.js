import books from "../data/books";
import BookCard from "../components/BookCard";
import { Container, Row, Col } from "react-bootstrap";

const Services = () => {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Our Collection</h1>
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
