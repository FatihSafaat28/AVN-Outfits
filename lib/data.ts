export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  { "id": "k1", "name": "Basic White Tee", "category": "Kaos", "price": 150000, "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  { "id": "k2", "name": "Oversized Black T-Shirt", "category": "Kaos", "price": 175000, "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80" },
  { "id": "k3", "name": "Navy Striped Henley", "category": "Kaos", "price": 185000, "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  { "id": "k4", "name": "Beige Essential Tee", "category": "Kaos", "price": 150000, "image": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80" },
  { "id": "m2", "name": "Navy Blue Flannel", "category": "Kemeja", "price": 275000, "image": "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80" },
  { "id": "m3", "name": "Olive Linen Shirt", "category": "Kemeja", "price": 290000, "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80" },
  { "id": "m4", "name": "Light Denim Shirt", "category": "Kemeja", "price": 310000, "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80" },
  { "id": "p2", "name": "Khaki Regular Trousers", "category": "Celana Panjang", "price": 340000, "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80" },
  { "id": "p3", "name": "Classic Blue Denim", "category": "Celana Panjang", "price": 450000, "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80" },
  { "id": "p5", "name": "Navy Formal Pants", "category": "Celana Panjang", "price": 350000, "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80" },
  { "id": "s1", "name": "Khaki Chino Shorts", "category": "Celana Pendek", "price": 210000, "image": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80" },
  { "id": "s2", "name": "Black Sweatshorts", "category": "Celana Pendek", "price": 190000, "image": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80" },
  { "id": "s4", "name": "Olive Cargo Shorts", "category": "Celana Pendek", "price": 240000, "image": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80" },
];
