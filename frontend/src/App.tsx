import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './Counter';
import CounterWithReducer from './CounterWithReducer';
import {FruitsList, FruitsData} from './Fruits';

// 関数引数は interfaceで定義することが多い
interface AppProps {
  message: string;
  flag?: boolean;
}

// 関数
const func: React.FunctionComponent<AppProps> = (props) => {
  return <div>{props.message}</div>;
};

function App(props: AppProps) {
  return (
    <div className="App">
      <header className="App-header">
        <div>{props.message}</div>
        <div>{func(props)}</div>
        <Counter />
        <CounterWithReducer/>

        <div>
          <h1>Fruits List</h1>
          <h1>Fruits</h1>
          <FruitsData id={3}/>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// AppPropsにデフォルト値を持たせる場合
App.defaultProps = {
  message: "a"
}

export default App;
