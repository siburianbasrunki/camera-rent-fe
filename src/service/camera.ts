// src/service/camera.ts
import { getEndpoints } from "../config/config";
import type { Camera, DetailCamera } from "../model/camera";

const CameraService = {
  async getCameras(): Promise<Camera[]> {
    const { camera } = getEndpoints();
    const res = await fetch(camera);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  async getCameraById(id: string): Promise<DetailCamera> {
    const { camera } = getEndpoints();
    const res = await fetch(`${camera}/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },

  async createCamera(formData: FormData): Promise<Camera> {
    const { camera } = getEndpoints();
    const res = await fetch(camera, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data;
  },
};

export default CameraService;