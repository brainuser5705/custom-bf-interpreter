import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { lex } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';

function test(){
  let program = ">++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.";

  let lexer_tokens = [];
  for (let lexer_token of lex(program)){
    lexer_tokens.push(lexer_token);
  }

  // console.log(lexer_tokens);

  let ast_tokens = [];
  for (let ast_token of parse(lexer_tokens)){
    ast_tokens.push(ast_token);
  };

  // console.log(ast_tokens);

  console.log("Evaluating");
  evaluate(ast_tokens);

}
function App() {

  useEffect(() => {
    test();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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

export default App;
