export function getEndpoints() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return {
    brand: `${BASE_URL}/brands`,
    camera: `${BASE_URL}/cameras`,
    banner: `${BASE_URL}/banner`,
  };
}
