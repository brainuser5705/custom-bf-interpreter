// import './App.css';
import React, { useState } from 'react';
import { lex } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';
import { SymbolField } from './components/SymbolField';
import './App.css';
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

  const [oldSymbols, setOldSymbols] = useState({
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

  function updateCode(){       
    console.log(symbols);
    console.log(oldSymbols);
    let temp = code;          
    for (let symbolName of Object.keys(symbols)){
      let newCode = temp.replaceAll(oldSymbols[symbolName], symbols[symbolName]);
      temp = newCode; // can't put setCode() in loop for some reason?
    }
    setCode(temp);
    setOutput("Output will be here...")
    setOldSymbols(symbols);

    console.log(symbols);
    console.log(oldSymbols);
  }
  
  return (
      <div className="App">

        <div id="heading-container" className="m-5">
          <h1>Custom Brainf**k Interpreter</h1>
          <h2>Create your own Brainf**k variant!</h2>
        </div>
        

        <div className="container-sm row align-items-start mx-auto">

          <div id="symbol-container" className="col container-sm me-5">
            <h3>Change the symbols!</h3>
            <SymbolContext.Provider value={{symbols: symbols, setSymbols: setSymbols, oldSymbols: oldSymbols, setOldSymbols: setOldSymbols}}>
              {Object.keys(symbols).map(key => (
                <SymbolField symbolName={key} />
              ))}
            </SymbolContext.Provider>
            <button onClick={() => updateCode()}>Update Code</button>
          </div>
          

          <div id="code-container" className="col container-sm ms-5">
            <h3>Enter your code here: </h3>

            <div id="code-container-input" className='mb-5'>
              <textarea 
                value={code}
                onChange={e => setCode(e.target.value)}
                rows={10}
                placeholder={"Enter your code here..."}
              ></textarea>
              <br />
              <button onClick={() => runInterpreter()}>Run code</button>
            </div>
            
            <div>
              <h3>Output: </h3>
              <div>
                {output}
              </div>
            </div>

          </div>

        </div>
      </div>
      
  );
}

export { App, SymbolContext };
