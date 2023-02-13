// Expressをつかったバックエンド
// https://ralacode.com/blog/post/create-nodejs-react-app-with-typescript/
//
// サーバ起動方法
// npx ts-node server.ts

export {}

import { ExecException } from "child_process";
import express from "express";

// Expressを使う
const app: express.Express = express();
const port: number = 8000; // port

// 型の定義
type Fruit = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Fruits = Fruit[] | null;

// hello world
// https://expressjs.com/ja/starter/hello-world.html
app.get("/",
  (req: express.Request, res: express.Response) => {
    res.send("Hellow, world!");
  });

// api sample
app.get("/api",
  (req:express.Request, res:express.Response) => {
    const fruits: Fruits = [
      {
        id: 1,
        name: "りんご",
        price: 200,
        image: "https://source.unsplash.com/gDPaDDy6_WE",
      },
      {
        id:2,
        name:"バナナ",
        price:300,
        image:"https://source.unsplash.com/zrF6ACPLhPM",
       },
       {
        id:3,
        name:"みかん",
        price:150,
        image:"https://source.unsplash.com/bogrLtEaJ2Q",
      },
      {
        id:4,
        name:"メロン",
        price:2000,
        image:"https://source.unsplash.com/8keUtGmy0xo",
      }]; 

    const id: number | undefined = req.query["id"] ? Number(req.query["id"]) : undefined;
    console.log(id);

    if (id)
    {
      let result: Fruits = [];
      for (const value of fruits) {
        console.log(value);
        // a b cの順で出力される
        if (value.id == id) {
          result?.push(value);
          break;
        }
      }
      res.json(result);
    } else {
      res.json(fruits);
    }
  });

app.listen(port, () =>{
  console.log(`port ${port} でサーバ起動中`);
});
