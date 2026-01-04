import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookDetails({ addToCart }) {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setBook(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading book...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>${book.price}</p>
      <p>{book.description}</p>
      <button onClick={() => addToCart(book)}>Add to Cart</button>
    </div>
  );
}
