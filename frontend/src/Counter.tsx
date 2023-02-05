//import React from "react"; // 決まり事のようなもの

/* まずは型定義
const Counter: React.FunctionComponent<{}> = () => {
  const value = 0;
  return <div>value: {value}</div>;
};
*/

/* React.FunctionComponentは長い。 FCでもよい
const Counter: React.FC<{}> = () => {
  const value = 0;
  return <div>value: {value}</div>;
};
*/

/* Counterの実装1 usestateを利用する（状態を変えることができる）
import React, {useState} from "react";

const Counter: React.FC<{}> = () => {
  // useStateで２つの要素（プロパティと状態を変更するための関数）が返る
  const [value, setValue] = useState<number>(0); // 初期値が 0

  // value+1, value-1をする関数を作成し、onClick に関数を割り当てる
  const increment = ()=>{ setValue(value + 1); };
  const decrement = ()=>{ setValue(value - 1); };

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  );
};
*/

/* onclickで直接 setValueを呼ぶ場合
import React, {useState} from "react";

const Counter: React.FC<{}> = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={() => {setValue(value + 1)}}>+1</button>
      <button onClick={() => {setValue(value - 1)}}>-1</button>
    </div>
  );
};
*/

/* useRef, useEffect
// useRef：コンポーネントの有効期限にわたって保持する
// useEffect：すべての DOM 変更の後に同期的に起動
import React, {useRef, useEffect, useState} from "react";

const Counter: React.FC<{}> = () => {
  const [value, setValue] = useState<number>(0);

  // 何回リレンダされたか
  const renderTimes = useRef<number>(0);
  
  // レンダされたら実行
  useEffect(()=>{
    renderTimes.current += 1;
  });

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={() => {setValue(value + 1)}}>+1</button>
      <button onClick={() => {setValue(value - 1)}}>-1</button>
      <div>
        this component was re-rendered {renderTimes.current} times
      </div>
    </div>
  );
};
*/

// useRefの一般的な使い方、レンダー時にInputにフォーカスを設定する
import React, {useRef, useEffect, useState} from "react";

const Counter: React.FC<{}> = () => {
  const [value, setValue] = useState<number>(0);

  const renderTimes = useRef<number>(0);
  
  useEffect(()=>{
    renderTimes.current += 1;
  });

  // Inputを保持するための箱を準備
  const ref = useRef<HTMLInputElement>(null);

  // この場合、利用する時点では nullではないのでこれでも良い
  // !を non-null assertionとよぶ
  //const ref = useRef<HTMLInputElement>(null!); 
  
  // Inputにフォーカスする関数
  const focusInput = () =>{
    ref.current?.focus(); //if (ref.current) ref.current.focus();
  };

  return (
    <div>
      <div>value: {value}</div>
      <button onClick={() => {setValue(value + 1)}}>+1</button>
      <button onClick={() => {setValue(value - 1)}}>-1</button>
      <div>
        this component was re-rendered {renderTimes.current} times
      </div>
      {/* Inputエレメント */}
      <input ref={ref} type="text"/>
      {/* ボタン押下するとInputエレメントにフォーカス設定 */}
      <button onClick={()=>{focusInput();}}>click me (set focus)</button>
    </div>
  );
};

export default Counter;
