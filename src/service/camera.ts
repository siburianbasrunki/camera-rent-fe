import { getEndpoints } from "../config/config";
import type { Camera } from "../model/camera";

const CameraService = {
  async getCameras(): Promise<Camera[]> {
    const { camera } = getEndpoints();
    const res = await fetch(camera);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    return json.data || [];
  },

  //   async getBookById(id: string): Promise<Brand> {
  //     const { bookById } = getEndpoints();
  //     const res = await fetch(bookById(id));
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //     const json = await res.json();
  //     return json.data;
  //   },

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

  //   async updateBrand(id: string, formData: FormData): Promise<Brand> {
  //     const { bookById } = getEndpoints();
  //     const res = await fetch(bookById(id), {
  //       method: "PUT",
  //       body: formData,
  //     });
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //     const json = await res.json();
  //     return json.data;
  //   },

  //   async deleteBook(id: string): Promise<void> {
  //     const { bookById } = getEndpoints();
  //     const res = await fetch(bookById(id), {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //   },
};

export default CameraService;
