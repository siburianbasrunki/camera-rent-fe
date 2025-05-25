import { useEffect, useState } from "react";
import type { Book } from "../model/book";
import BookService from "../service/book";

export const useBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const booksData = await BookService.getBooks();
        setBooks(booksData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return { books, loading, error };
};
