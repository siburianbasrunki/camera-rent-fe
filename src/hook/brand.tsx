import { useQuery } from "@tanstack/react-query";
import BrandService from "../service/brand";

export const useBrand = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: BrandService.getBrand,
  });
};