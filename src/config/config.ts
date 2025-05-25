export function getEndpoints() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return {
    books: `${BASE_URL}/books`,
    bookById: (id: string) => `${BASE_URL}/books/${id}`,
    brand: `${BASE_URL}/brands`,
    camera: `${BASE_URL}/cameras`,
  };
}
