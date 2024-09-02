import "@/styles/globals.css";
import { BookmarkProvider } from '../context/BookmarkContext';

export default function App({ Component, pageProps }) {
  return (
    <BookmarkProvider>
      <Component {...pageProps} />
    </BookmarkProvider>
  );
}
