export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}

export interface User {
  // export to loginRoute.ts
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Comment {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  post_id: number;
}

export interface Login {
  id: number;
  username: string; // export to loginRoute.ts
  email: string;
  password: string;
}

export interface Products {
  id: number;
  product_name: string;
  image: string;
}

export interface Productrecords {
  id: number;
}

export interface ProductPage {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: boolean;
  quantity: number;
}
