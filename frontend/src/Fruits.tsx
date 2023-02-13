import React, {useEffect, useState} from "react";

// apiから受け取る型の定義
type Fruit = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Fruits = Fruit[] | null;

export const FruitsList: React.FC<{}> = () => {
  // 「データがない状態」から「データがある状態」に変化させるため「useState」を使います。
  const [fruits, setFruits] = React.useState<Fruits>(null);

  // データ取得の処理は「コンポーネントをマウントしたときだけ」行うので「useEffect」を使います。
  // そうしないとデータ取得のループが起きて、バグ発生となります。
  React.useEffect(() => {
    // データ取得関数定義
    const fetchData = async () => {
      try
      {
        console.log("call api FruitsList");
        // apiコール
        // fetch関数の引数はURL。
        // http:// ～書くと取得できず、host部分は package.jsonの proxyに記載している、
        const res: Response = await fetch("/api");
        // wait response
        const json: React.SetStateAction<Fruits> = await res.json();
        // useStateにセット
        setFruits(json);
      } catch(e:unknown){
        if (e instanceof Error)
        {
          console.error(e.message);
        }
      }
    };

    // データ取得関数実行
    fetchData();
  }, []);

  return (
    <div>
      {/* fruitsが取得できたら mapでループ処理する */}
      {fruits?.map((fruit) => (
        <div key={fruit.id}>
          <figure>
            <img src={fruit.image} alt={fruit.name}/>
          </figure>
          <div>
          <p>{fruit.name}</p>
          <p>￥{fruit.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// 入力パラメータ
// 関数引数は interfaceで定義することが多い
interface FruitsProps {
  id: number;
}

export const FruitsData: React.FC<FruitsProps> = (props:FruitsProps) => {
  // 「データがない状態」から「データがある状態」に変化させるため「useState」を使います。
  const [fruits, setFruits] = React.useState<Fruits>(null);

  // データ取得の処理は「コンポーネントをマウントしたときだけ」行うので「useEffect」を使います。
  // そうしないとデータ取得のループが起きて、バグ発生となります。
  React.useEffect(() => {
    // データ取得関数定義
    const fetchData = async (p: FruitsProps) => {
      try
      {
        console.log("call api FruitsData");
        // apiコール
        // fetch関数の引数はURL。
        // http:// ～書くと取得できず、host部分は package.jsonの proxyに記載している、
        const url: string = `/api?id=${p.id}`;
        console.log(url);

        const res: Response = await fetch(url);
        // wait response
        const json: React.SetStateAction<Fruits> = await res.json();
        // useStateにセット
        setFruits(json);
      } catch(e:unknown){
        if (e instanceof Error)
        {
          console.error(e.message);
        }
      }
    };

    // データ取得関数実行
    fetchData(props);
  }, []);

  return (
    <div>
      {/* fruitsが取得できたら mapでループ処理する */}
      {fruits?.map((fruit) => (
        <div key={fruit.id}>
          <figure>
            <img src={fruit.image} alt={fruit.name}/>
          </figure>
          <div>
          <p>{fruit.name}</p>
          <p>￥{fruit.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// これだと複数Exportができないので、宣言の先頭に exportをつければいい
//export default FruitsList;

