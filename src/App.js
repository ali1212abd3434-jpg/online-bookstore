import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (book) => {
  console.log("Adding to cart:", book);   // ✅ debug line
  setCart([...cart, book]);
};


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book/:id" element={<BookDetails addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
