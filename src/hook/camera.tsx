import { useQuery } from "@tanstack/react-query";
import CameraService from "../service/camera";
import { useParams } from "react-router-dom";

export const useCamera = () => {
  return useQuery({
    queryKey: ['cameras'],
    queryFn: CameraService.getCameras,
  });
};

export const useCameraById = () => {
  const { id } = useParams<{ id: string }>();
  return useQuery({
    queryKey: ['cameras', id],
    queryFn: () => {
      if (!id) throw new Error('No ID provided');
      return CameraService.getCameraById(id);
    },
    enabled: !!id,
  });
};