import { TUser, TProduct, TPurchase } from "./type";

// Usuários
const users: TUser[] = [
  {
    id: '1',
    email: 'joao@gmail.com',
    password: 'joao123',
  },
  {
    id: '2',
    email: 'maria@gmail.com',
    password: 'maria123',
  },
];
// Produtos
const products: TProduct[] = [
  {
    id: '1',
    name: 'Camisa Polo',
    price: 50,
    category: 'Roupas',
  },
  {
    id: '2',
    name: 'Calça Jeans',
    price: 80,
    category: 'Roupas',
  },
];
// Compras
const purchases: TPurchase[] = [
  {
    userId: '1',
    productId: '1',
    quantity: 2,
    totalPrice: 100,
  },
  {
    userId: '2',
    productId: '2',
    quantity: 3,
    totalPrice: 240,
  },
];

export { users, purchases, products}