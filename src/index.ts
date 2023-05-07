import { users, products, purchases } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { ProductCategory, TProduct, TPurchase, TUser } from "./type";
import { db } from "./knex";


const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong!");
});

//get usuarios
app.get("/usuarioxs", async (req: Request, res: Response):Promise<void> => {
  try {
    const result = await db.raw(`SELECT * FROM usuarioxs;`)
    res.status(200).send(result);

  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    if(error instanceof Error){
      res.send(error.message);
    }
  }
});

//get produtos
app.get("/products", async (req: Request, res: Response):Promise<void> => {
  try {
    const [products] = await db.raw(`SELECT * FROM products`)
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if(error instanceof Error){
      res.send(error.message);
    }else{
      res.send("erro inesperado")
    }
  }
});

//searchProductByName
app.get("/products/search", (req: Request, res: Response) => {
  try {
    const q = req.query.name as string
    if (q.length < 1) {
      res.status(400);
      throw new Error("'query params' deve possuir pelo menos um caractere");
    }
    const result = products.filter((item) =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
    res.status(200).send(result);
  } catch (error:any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//createUser
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password }: TUser = req.body;
    if (!id) {
      res.status(400);
      throw new Error("'id' deve ser passado no body");
    }
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser do tipo 'string'");
    }
    if (!email) {
      res.status(400);
      throw new Error("'email' deve ser passado no body");
    }
    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' deve ser do tipo 'string'");
    }
    if (!password) {
      res.status(400);
      throw new Error("'password' deve ser passado no body");
    }
    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' deve ser do tipo 'string'");
    }
    const searchId = users.find((user) => user.id === id);
    if (searchId) {
      res.status(400);
      throw new Error("Já existe uma conta com esse id");
    }
    const searchEmail = users.find((user) => user.email === email);
    if (searchEmail) {
      res.status(400);
      throw new Error("Já existe uma conta com esse email");
    }
    const newUser: TUser = { id, email, password };
    users.push(newUser);
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//createProduct
app.post("/products", async(req: Request, res: Response) => {
  try {
    const { id, name, price, category }: TProduct = req.body;
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("id invalido, deve ser string");
    } 

    await db.raw(`INSERT INTO (id, name, price, category)
    VALUES ("${id}", "${name}", "${price}", "${category}")
    `)

    res.status(200).send("Usuário criado com sucesso");
    if (!name) {
      res.status(400);
      throw new Error("'name' deve ser passado no body");
    }
    if (!price) {
      res.status(400);
      throw new Error("'price' deve ser passado no body");
    }
    if (!ProductCategory) {
      res.status(400);
      throw new Error("'ProductCategory' deve ser passado no body");
    }

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser do tipo 'string'");
      }
    }
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'name' deve ser do tipo 'string'");
      }
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("'price' deve ser do tipo 'number'");
      }
    }

    if (ProductCategory !== undefined) {
      if (
        category !== ProductCategory.ACCESSORIES &&
        category !== ProductCategory.CLOTHES_AND_SHOES &&
        category !== ProductCategory.ELETRONICS
      ) {
        res.status(400);
        throw new Error(
          "'ProductCategory' deve ter um tipo válido: 'Acessórios', 'Roupas e calçados', 'Eletrônicos', 'Beleza', 'Banho'"
        );
      }
    }
   
    const [searchId] = await db.raw(`SELECT * FROM products WHERE id = "${id}"`);
    if (searchId) {
      res.status(400);
      throw new Error("Já existe um produto cadastrado com esse 'id'");
    }

    const newProduct: TProduct = { id, name, price, category };
    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");

  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//createPurchase
app.post("/purchases", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice }: TPurchase = req.body;

    if (!userId) {
      res.status(400);
      throw new Error("'userId' deve ser passado no body");
    }
    if (!productId) {
      res.status(400);
      throw new Error("'productId' deve ser passado no body");
    }
    if (!quantity) {
      res.status(400);
      throw new Error("'quantity' deve ser passado no body");
    }
    if (!totalPrice) {
      res.status(400);
      throw new Error("'totalPrice' deve ser passado no body");
    }
    if (userId !== undefined) {
      if (typeof userId !== "string") {
        res.status(400);
        throw new Error("'userId' deve ser do tipo 'string'");
      }
    }
    if (productId !== undefined) {
      if (typeof productId !== "string") {
        res.status(400);
        throw new Error("'productId' deve ser do tipo 'string'");
      }
    }
    if (quantity !== undefined) {
      if (typeof quantity !== "number") {
        res.status(400);
        throw new Error("'quantity' deve ser do tipo 'number'");
      }
    }
    if (totalPrice !== undefined) {
      if (typeof totalPrice !== "number") {
        res.status(400);
        throw new Error("'totalPrice' deve ser do tipo 'number'");
      }
    }
    const searchUserId = users.find((user) => user.id === userId);
    if (!searchUserId) {
      res.status(404);
      throw new Error(
        "'userId' deve corresponder à 'id' de um usuário cadastrado"
      );
    }
    const searchProductId = products.find(
      (product) => product.id === productId
    );
    if (!searchProductId) {
      res.status(400);
      throw new Error(
        "'productId' deve corresponder à 'id' de um produto cadastrado"
      );
    }
    if (searchProductId) {
      if (searchProductId.price * quantity !== totalPrice) {
        res.status(400);
        throw new Error(
          "O valor total da compra não corresponde ao valor do produto vezes a quantidade informada"
        );
      }
    }
    const newPurchase: TPurchase = { userId, productId, quantity, totalPrice };
    purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//getProductsById
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = products.find((product) => product.id === id);
    if (!result) {
      res.status(404);
      throw new Error(
        "O produto não existe em nosso banco de dados. Verifique o 'id'"
      );
    }
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//getUserPurchasesByUserId
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    const searchUserId = users.find((user) => user.id === id);
    if (!searchUserId) {
      res.status(404);
      throw new Error("Usuário não existe. Verifique o 'id'");
    }

    const userPurchases = purchases.filter(
      (purchase) => purchase.userId === id
    );

    res.status(200).send(userPurchases);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//deleteUserById
app.delete("/users/:id", async(req: Request, res: Response)=> {
  try {
    const id = req.params.id;
    const [searchUserId] = await db.raw(`SELECT * FROM usuarioxs WHERE id = "${id}"`)
    if (!searchUserId) {
      res.status(404);
      throw new Error("Usuário não existe. Verifique o 'id'");
    }
    await db.raw(`DELETE FROM usuarioxs WHERE id ="${searchUserId.id}"`)
    
    res.status(200).send("Usuário apagado com sucesso");
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//deleteProductById
app.delete("/products/:id", async(req: Request, res: Response) => {
try{
  const id = req.params.id;
  const [searchProduct] = await db.raw(`SELECT * FROM products WHERE id = "${id}"`)
  if(!searchProduct){
    res.status(404)
    throw new Error("Produto não existe. Verifique o 'id'")
  }
 await db.raw(`DELETE FROM products WHERE id ="${searchProduct.id}"`)

  res.status(200).send("Produto apagado com sucesso");
} catch (error: any) {
  if (res.statusCode === 200) {
    res.status(500);
  }
  res.send(error.message);
}
});

//editUserById
app.put("/users/:id", async(req: Request, res: Response) => {
 try{
  const id = req.params.id;
  const newEmail = req.body.email
  const newPassword = req.body.password

  const [searchUserId] = await db.raw(`SELECT * FROM usuarioxs WHERE id = "${id}"`);
    if (!searchUserId) {
      res.status(404);
      throw new Error("Usuário não existe. Verifique o 'id'");
    }

    if(newEmail !== undefined){
      if(typeof newEmail !== "string"){
        res.status(400)
        throw new Error("'email' deve ser do tipo 'string'")
      }
    }

    if(newPassword !== undefined){
      if(typeof newPassword !== "string"){
        res.status(400)
        throw new Error("'password' deve ser do tipo 'string'")
      }
    }
  const result = users.find((user) => user.id === id);
  if (result) {
    result.email = newEmail || result.email;
    result.password = newPassword || result.password;
  }
  res.status(200).send("Cadastro atualizado com sucesso");
 } catch(error: any){
  console.log(error)
  if (res.statusCode === 200) {
    res.status(500);
  }
  res.send(error.message);
 }
});

// editProductById
app.put("/products/:id", (req: Request, res: Response) => {

try{
  const id = req.params.id;
  const newName = req.body.name
  const newPrice = req.body.price
  const newProductCategory = req.body.ProductCategory

  const searchProduct = products.find(product => product.id === id)
  if(!searchProduct){
    res.status(404)
    throw new Error("Produto não encontrado. Verifique o 'id'")
  }
 
  if(newName !== undefined){
    if(typeof newName !== "string"){
      res.status(400)
      throw new Error("'name' deve ser do tipo 'string'")
    }
  }
  if(newPrice !== undefined){
    if(typeof newPrice !== "number"){
      res.status(400)
      throw new Error("'price' deve ser do tipo 'number'")
    }
  }
  if (newProductCategory !== undefined) {
    if (
      newProductCategory !== ProductCategory.ACCESSORIES &&
      newProductCategory !== ProductCategory.CLOTHES_AND_SHOES &&
      newProductCategory !== ProductCategory.ELETRONICS
    ) {
      res.status(400);
      throw new Error(
        "'ProductCategory' deve ter um tipo válido: 'Acessórios', 'Roupas e calçados', 'Eletrônicos', 'Beleza', 'Banho'"
      );
    }
  }
  const result = products.find((product) => product.id === id);
  if (result) {
    result.name = newName || result.name;
    result.price = newPrice || result.price;
    result.category = newProductCategory || result.category;
  }
  res.status(200).send("Produto atualizado com sucesso");
} catch(error:any){
  console.log(error)
  if (res.statusCode === 200) {
    res.status(500);
  }
  res.send(error.message);
 }
});

console.log(users, products, purchases)

