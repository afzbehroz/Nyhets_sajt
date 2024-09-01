import { Card, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function NewsList(props) {
  const { category, searchTerm } = props;
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://newsdata.io/api/1/latest?apikey=pub_51589b8da720f0231e4047219d916a38b87a7&country=bd&language=en`;

      if (category) {
        url += `&category=${category}`; 
      }
      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }

      console.log("Fetching URL: ", url); // Debug the URL
      console.log("Category: ", category); // Ensure the category is correctly passed

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setNews(data.results || []); // Handle empty or undefined results
    };

    fetchNews();
  }, [category, searchTerm]); // Fetch news again whenever category or searchTerm changes

  return (
    <Container>
      <Row>
        {news && news.length > 0 ? (
          news.map((article, index) => (
            <Col xs={12} md={6} lg={4} key={article.url || index}>
              <Card>
                {article.image_url && (
                  <Card.Img src={article.image_url} variant="top" />
                )}
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Card.Link href={article.url}>Read More</Card.Link>
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
