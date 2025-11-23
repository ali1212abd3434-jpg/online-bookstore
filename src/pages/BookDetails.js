import { useParams } from "react-router-dom";
import books from "../data/books";
import { Container, Button } from "react-bootstrap";

const BookDetails = () => {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) return <Container className="mt-4"><p>Book not found!</p></Container>;

  return (
    <Container className="mt-4">
      <h1>{book.title}</h1>
      <img src={book.image} alt={book.title} className="img-fluid mb-3" />
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>
      <Button variant="success">Add to Cart</Button>
    </Container>
  );
};

export default BookDetails;
