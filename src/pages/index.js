import NewsList from "@/Components/NewList";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Row,
  Col,
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fa-4">
            News
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/bookmarks">Bookmarks</Nav.Link> {/* New Link to Bookmarks */}
            </Nav>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategoryClick("world")}>
                  World
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategoryClick("top")}>
                  Top
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategoryClick("other")}>
                  Other
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategoryClick("sports")}>
                  Sports
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="search"
                className="me-2"
                name="search"
              />
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h5>Categories</h5>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleCategoryClick("world")}>
                World
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("top")}>
                Top
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("other")}>
                Other
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("sports")}>
                Sports
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={9}>
            <NewsList category={category} searchTerm={searchTerm} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
