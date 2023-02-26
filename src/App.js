// import './App.css';
import React, { useState } from 'react';
import { lex } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';
import { SymbolField } from './components/SymbolField';

const SymbolContext = React.createContext(null);

function App() {

  const [symbols, setSymbols] = useState({
    "shift_right": ">",
    "shift_left": "<",
    "increment": "+",
    "decrement": "-",
    "output": ".",
    "input": ",",
    "start_while": "[",
    "end_while": "]"
  });

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Output will be here...");

  function runInterpreter() {

      let lexer_tokens = [];
      for (let lexer_token of lex(symbols, code)){
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

        <SymbolContext.Provider value={{symbols: symbols, setSymbols: setSymbols }}>
          {Object.keys(symbols).map(key => (
            <SymbolField symbolName={key} />
          ))}
        </SymbolContext.Provider>

        <div>
          <textarea value={code} onChange={e => setCode(e.target.value)}>
          </textarea>

          <button onClick={() => runInterpreter()}>Run code</button>

          <div>
            {output}
          </div>

        </div>

      </div>
      
  );
}

export { App, SymbolContext };
