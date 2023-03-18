import { TUser, TProduct, TPurchase, ProductCategory } from "./type";

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
    id: "1",
    name: "Camiseta",
    price: 29.99,
    category: ProductCategory.CLOTHES_AND_SHOES
  },
  {
    id: "2",
    name: "Tênis",
    price: 199.99,
    category: ProductCategory.CLOTHES_AND_SHOES
  },
  {
    id: "3",
    name: "Boné",
    price: 19.99,
    category: ProductCategory.ACCESSORIES
  },
  {
    id: "4",
    name: "Óculos de sol",
    price: 129.99,
    category: ProductCategory.ACCESSORIES
  },
  {
    id: "5",
    name: "Smartphone",
    price: 999.99,
    category: ProductCategory.ELETRONICS
  },
  {
    id: "6",
    name: "Notebook",
    price: 2999.99,
    category: ProductCategory.ELETRONICS
  }
];;
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
function createUser(id: string, email: string, password: string): string {
  const newUser: TUser = {
    id,
    email,
    password
  }
  users.push(newUser);
  return "Cadastro realizado com sucesso";
}

function getAllUsers(): TUser[] {
  return users;
}

function createProduct(id: string, name: string, price: number, category: ProductCategory): string {
  const newProduct: TProduct = {
    id,
    name,
    price,
    category
  }
  products.push(newProduct);
  return "Produto criado com sucesso";
}

function getAllProducts(): TProduct[] {
  return products;
}

function getProductById(idToSearch: string): TProduct | undefined {
  return products.find((product: TProduct) => product.id === idToSearch);
}
function queryProductsByName(q: string): TProduct[] {
  const lowerCaseQ = q.toLowerCase();
  return products.filter((product: TProduct) => product.name.toLowerCase().includes(lowerCaseQ));
}

function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {
  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice
  }
  purchases.push(newPurchase);
  return "Compra realizada com sucesso";
}

function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] {
  return purchases.filter((purchase: TPurchase) => purchase.userId === userIdToSearch);
}




export { users, purchases, products, createUser, getAllUsers, createProduct, getAllProducts, getProductById };