import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/admin";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // editing
  const [editingId, setEditingId] = useState(null);

  // ✅ declare once
  const token = localStorage.getItem("adminToken");

  // ✅ correct auth header format in JS
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setPrice("");
    setImage("");
    setDescription("");
    setEditingId(null);
  };

  const fetchBooks = async () => {
    setError("");
    try {
      const res = await axios.get(`${API}/books`, config);
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      const msg = (e && e.response && e.response.data && e.response.data.error) || "Not authorized. Please login.";
      setError(msg);

      // if unauthorized, force login
      if (e && e.response && e.response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
      }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = { title, author, price, image, description };

    try {
      if (editingId) {
        await axios.put(`${API}/books/${editingId}`, payload, config);
        setSuccess("Book updated ✅");
      } else {
        await axios.post(`${API}/books`, payload, config);
        setSuccess("Book created ✅");
      }

      resetForm();
      fetchBooks();
    } catch (e2) {
      const msg = (e2 && e2.response && e2.response.data && e2.response.data.error) || "Action failed";
      setError(msg);

      if (e2 && e2.response && e2.response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
      }
    }
  };

  const startEdit = (book) => {
    setEditingId(book.id);
    setTitle(book.title || "");
    setAuthor(book.author || "");
    setPrice(book.price || "");
    setImage(book.image || "");
    setDescription(book.description || "");
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");

    if (!window.confirm("Delete this book?")) return;

    try {
      await axios.delete(`${API}/books/${id}`, config);
      setSuccess("Book deleted ✅");
      fetchBooks();
    } catch (e3) {
      const msg = (e3 && e3.response && e3.response.data && e3.response.data.error) || "Delete failed";
      setError(msg);

      if (e3 && e3.response && e3.response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin-login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Admin Dashboard</h1>
        <Button variant="secondary" onClick={logout}>
          Logout
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row className="g-4">
        <Col md={5}>
          <h4>{editingId ? `Edit Book #${editingId}` : "Add New Book"}</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Author</Form.Label>
              <Form.Control value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control value={image} onChange={(e) => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant={editingId ? "warning" : "primary"}>
                {editingId ? "Update Book" : "Create Book"}
              </Button>

              {editingId && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Col>

        <Col md={7}>
          <h4>Books</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th style={{ width: 170 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>${b.price}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => startEdit(b)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(b.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}