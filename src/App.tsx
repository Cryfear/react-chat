import React from 'react';
import 'antd/dist/antd.css';
import TypicalButton from './components/TypicalButton';

function App() {
  let str: string = 'hello world';
  return (
    <div className="App">
      {str}
      <TypicalButton children="hello" />
    </div>
  );
}

export default App;
