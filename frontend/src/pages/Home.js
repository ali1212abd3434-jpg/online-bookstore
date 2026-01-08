import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

export default function Home({ addToCart }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading books...</span>
      </div>
    );

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4 text-primary">Book List</h1>
      <Row>
        {books.map((book) => (
          <Col key={book.id} md={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author}
                </Card.Subtitle>
                <Card.Text>${book.price}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => addToCart(book)}
                  className="w-100"
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
