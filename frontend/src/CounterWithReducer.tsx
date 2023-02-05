/* useReducerの基本
// 元ソース：https://ja.reactjs.org/docs/hooks-reference.html#usereducer
import React, { Dispatch, ReducerAction, useReducer } from "react";

const initialState = {count: 0};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  );
}
*/

/* 適切な型制約をつける
import React, { Dispatch, ReducerAction, ReducerState, useReducer } from "react";

// 型定義
type StateType = {
  count: number;
}
type ActionType = {
  type: 'decrement' | 'increment' 
}

const initialState: StateType = {count: 0}; // 定義

function reducer(state: StateType, action: ActionType): StateType | never { // 定義
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </div>
  );
}
*/

// resetを追加
import React, { Dispatch, ReducerAction, ReducerState, useReducer } from "react";

type StateType = {
  count: number;
}
type ActionType = {
  type: 'decrement' | 'increment' | 'reset' //追加
}

const initialState: StateType = {count: 0};

function reducer(state: StateType, action: ActionType): StateType | never {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};

    // resetで 初期値を返す
    case 'reset':
      return initialState;

    default:
      throw new Error();
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      {/* 追加 */}
      <button onClick={() => dispatch({type: 'reset'})}>reset</button>
    </div>
  );
}

export default CounterWithReducer;
