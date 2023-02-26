// import './App.css';
import { useState } from 'react';
import { lex } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';

// function test(){
//   let program = ">++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.";
// }

function App() {

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Output will be here...");

  function runInterpreter(code) {

      let lexer_tokens = [];
      for (let lexer_token of lex(code)){
        lexer_tokens.push(lexer_token);
      }
    
      let ast_tokens = [];
      for (let ast_token of parse(lexer_tokens)){
        ast_tokens.push(ast_token);
      };
    
      let output = evaluate(ast_tokens);
      setOutput(output);
  }
  
  return (
    <div>
      <textarea value={code} onChange={e => setCode(e.target.value)}>
      </textarea>

      <button onClick={() => runInterpreter(code)}>Run code</button>

      <div>
        {output}
      </div>

    </div>
  );
}

export default App;
