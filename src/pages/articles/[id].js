import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const url = `https://newsdata.io/api/1/latest?apikey=pub_52391c2a6b7292ceff7c47949ea3298eb768d&country=bd&language=en`;
        const response = await fetch(url);
        const data = await response.json();

        // Find the specific article by ID
        const foundArticle = data.results.find(article => article.article_id === id);
        setArticle(foundArticle);
        setLoading(false);
      };

      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <Container className="mt-4">
      <Card>
        {article.image_url && (
          <Card.Img variant="top" src={article.image_url} alt={article.title} />
        )}
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>
            {article.description}
          </Card.Text>
          {article.content && (
            <Card.Text>{article.content}</Card.Text>
          )}
          <Button
            variant="primary"
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Full Article
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
