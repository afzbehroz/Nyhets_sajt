import { useState, useEffect } from "react";

export default function useNewsData(category, searchTerm) {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);
        const apiKey = "pub_52396eb67dd49ca9dbd733e09e90e6f01325e";  // Your API key
        const baseUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}`;

        const categoryParam = category ? `&category=${category}` : "";
        const searchParam = searchTerm ? `&q=${searchTerm}` : "";

        const url = baseUrl + categoryParam + searchParam;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetched data in useNewsData:", data); // Log the API response

        setNewsData(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
}
