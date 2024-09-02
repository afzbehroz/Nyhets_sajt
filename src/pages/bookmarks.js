import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useBookmarks } from "../context/BookmarkContext";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <Container className="mt-4">
      <h1>Your Bookmarked Articles</h1>
      {bookmarks.length > 0 ? (
        <Row>
          {bookmarks.map((article, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card>
                {article.image_url && (
                  <Card.Img src={article.image_url} variant="top" />
                )}
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeBookmark(article.article_id)}
                  >
                    Remove Bookmark
                  </Button>
                  <Card.Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No bookmarks yet.</p>
      )}
    </Container>
  );
}
