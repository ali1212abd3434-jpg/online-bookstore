import React from "react";
import books from "../data/books";

export default function Home({ addToCart }) {
  console.log("Home received addToCart:", addToCart); // debug

  return (
    <div>
      <h1>Book List</h1>
      <div className="grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
