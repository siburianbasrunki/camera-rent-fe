import { useQuery } from "@tanstack/react-query";
import BannerService from "../service/banner";

export const useBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => BannerService.getBanner(),
  });
};
