export interface UserModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    imageUrl: string;
}

export interface UpdateUserPayload {
  name?: string;
  phoneNumber?: string;
  role?: string;
  image?: File | null;
}