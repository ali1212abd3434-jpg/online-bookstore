import books from "../data/books";
import BookCard from "../components/BookCard";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Welcome to Our Online Bookstore</h1>
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

export default Home;
