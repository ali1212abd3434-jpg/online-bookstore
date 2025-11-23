import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>by {book.author}</Card.Text>
        <Card.Text>${book.price}</Card.Text>
        <Button as={Link} to={`/book/${book.id}`} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
