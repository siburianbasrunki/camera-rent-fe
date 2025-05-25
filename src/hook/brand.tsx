import { useEffect, useState } from "react";
import BrandService from "../service/brand";
import type { Brand } from "../model/brand";

export const useBrand = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const brandData = await BrandService.getBrand();
        setBrands (brandData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return { brands, loading, error };
};
