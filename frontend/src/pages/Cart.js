import React from "react";

export default function Cart({ cart }) {
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} by {item.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
