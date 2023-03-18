
export enum ProductCategory {
  ACCESSORIES = 'Acessórios', 
  CLOTHES_AND_SHOES = 'Roupas e calçados',
  ELETRONICS = 'Eletronicos'
}

export type TUser = {
    id: string,
    email: string,
    password: string
  }
  
  export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: ProductCategory
  }
  
  export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
  }

