import { Container, Form, Button } from "react-bootstrap";

const Contact = () => {
  return (
    <Container className="mt-4">
      <h1>Contact Us</h1>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your message" />
        </Form.Group>
        <Button variant="primary" type="submit">Send Message</Button>
      </Form>
    </Container>
  );
};

export default Contact;
