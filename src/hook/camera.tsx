import { useEffect, useState } from "react";
import type { Camera } from "../model/camera";
import CameraService from "../service/camera";

export const useCamera = () => {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCameras = async () => {
      setLoading(true);
      try {
        const cameraData = await CameraService.getCameras();
        setCameras(cameraData);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCameras();
  }, []);

  return { cameras, loading, error };
};
