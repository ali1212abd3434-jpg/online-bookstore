import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Card className="mb-4 shadow-sm h-100 book-card">
      {/* Image container */}
      <div className="card-img-container">
        <Card.Img
          variant="top"
          src={book.image}
          alt={book.title}
          className="card-img-top"
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate">{book.title}</Card.Title>
        <Card.Text className="text-muted mb-2">by {book.author}</Card.Text>
        <Card.Text className="fw-bold mb-3">${book.price}</Card.Text>
        <Button
          as={Link}
          to={`/book/${book.id}`}
          variant="primary"
          className="mt-auto"
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
