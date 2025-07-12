export interface Camera {
  id: string;
  brandId: string;
  name: string;
  price: string;
  avaliable: boolean;
  imageUrl: string;
  imageId: string;
  brand: {
    id: string;
    name: string;
    imageUrl: string;
    imageId: string;
  };
}

export interface DetailCamera {
  id: string;
  brandId: string;
  name: string;
  price: string;
  avaliable: boolean;
  imageUrl: string;
  imageId: string;
  brand: {
    id: string;
    name: string;
    imageUrl: string;
    imageId: string;
  };
  ciri_ciri: {
    ciri: string;
  }[];
  cameraPhoto: {
    id: string;
    imageUrl: string;
    imageId: string;
  }[];
}

export interface Review {
  id: string;
  bookingId: string;
  cameraId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  camera?: Camera;
}