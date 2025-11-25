import React from "react";
import { useParams } from "react-router-dom";
import books from "../data/books";

export default function BookDetails({ addToCart }) {
  const { id } = useParams();
  const book = books.find((b) => b.id.toString() === id);

  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <button onClick={() => addToCart(book)}>Add to Cart</button>
    </div>
  );
}
