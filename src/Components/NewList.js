import Link from 'next/link';
import { Card, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function NewsList(props) {
  const { category, searchTerm } = props;
  const [news, setNews] = useState([]);

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

  return (
    <Container>
      <Row>
        {news && news.length > 0 ? (
          news.map((article, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card>
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
                  <Card.Link href={article.link} target="_blank" rel="noopener noreferrer">
                    Read Full Article
                  </Card.Link>
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
