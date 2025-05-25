import { getEndpoints } from "../config/config";
import type { Book } from "../model/book";

const BookService = {
  async getBooks(): Promise<Book[]> {
    const { books } = getEndpoints();
    const res = await fetch(books);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async getBookById(id: string): Promise<Book> {
    const { bookById } = getEndpoints();
    const res = await fetch(bookById(id));
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async createBook(formData: FormData): Promise<Book> {
    const { books } = getEndpoints();
    const res = await fetch(books, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async updateBook(id: string, formData: FormData): Promise<Book> {
    const { bookById } = getEndpoints();
    const res = await fetch(bookById(id), {
      method: "PUT",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async deleteBook(id: string): Promise<void> {
    const { bookById } = getEndpoints();
    const res = await fetch(bookById(id), {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  },
};

export default BookService;
