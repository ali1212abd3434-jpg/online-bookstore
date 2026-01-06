import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import BookCard from "../components/BookCard";

const Services = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/books") // your backend endpoint
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Our Collection</h1>
      <Row className="g-4">
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} md={4} lg={3}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
