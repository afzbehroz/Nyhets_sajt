import Link from "next/link";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useBookmarks } from "../context/BookmarkContext";

export default function NewsList(props) {
  const { category, searchTerm } = props;
  const [news, setNews] = useState([]);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://newsdata.io/api/1/latest?apikey=pub_52391c2a6b7292ceff7c47949ea3298eb768d&country=bd&language=en`;

      if (category) {
        url += `&category=${category}`;
      }
      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setNews(data.results || []);
    };

    fetchNews();
  }, [category, searchTerm]);

  const handleBookmarkToggle = (article) => {
    if (isBookmarked(article.article_id)) {
      removeBookmark(article.article_id);
    } else {
      addBookmark(article);
    }
  };

  const isBookmarked = (articleId) => {
    return bookmarks.some((article) => article.article_id === articleId);
  };

  return (
    <Container>
      <Row>
        {news && news.length > 0 ? (
          news.map((article, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card className="mb-4">
                {article.image_url && (
                  <Card.Img src={article.image_url} variant="top" />
                )}
                <Card.Body>
                  <Card.Title>
                    <Link href={`/articles/${article.article_id}`}>
                      {article.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant={
                        isBookmarked(article.article_id)
                          ? "primary"
                          : "outline-primary"
                      }
                      size="sm"
                      className="px-2 py-1"
                      onClick={() => handleBookmarkToggle(article)}
                      style={{ minWidth: "75px" }}
                    >
                      {" "}
                      {isBookmarked(article.article_id)
                        ? "Bookmarked"
                        : "Bookmark"}
                    </Button>
                    <Card.Link
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-3"
                    >
                      {" "}
                      Read Full Article
                    </Card.Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No articles available.</p>
        )}
      </Row>
    </Container>
  );
}
