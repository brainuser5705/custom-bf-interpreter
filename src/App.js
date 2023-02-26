// import './App.css';
import React, { useState } from 'react';
import { lex } from './interpreter/lexer';
import { parse } from './interpreter/parser';
import { evaluate } from './interpreter/evaluator';
import { SymbolField } from './components/SymbolField';
import { helloWorld, cat, print0to99 } from './examples/code-examples';
import { ook } from './examples/variant-examples';
import { translateFromBf } from './examples/translator';
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

  const [code, setCode] = useState(helloWorld);
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

  // function updateCode(){       

  //   console.log(symbols);
  //   console.log(oldSymbols);

  //   let bfCode = translateToBf(code, oldSymbols);
  //   console.log("bfCode: " + bfCode);

  //   let newCode = translateFromBf(bfCode, symbols);
  //   console.log("newCode: " + newCode)

  //   setOutput("Output will be here...")
  //   setOldSymbols(symbols);
  //   setCode(newCode);

  // }

  function loadSampleCode(code){
    let newCode = translateFromBf(code, symbols);
    setOutput("Output will be here...");
    setCode(newCode);
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
            <SymbolContext.Provider value={{symbols: symbols, setSymbols: setSymbols}}>
              {Object.keys(symbols).map(key => (
                <SymbolField symbolName={key} />
              ))}
            </SymbolContext.Provider>
            {/* <button onClick={() => updateCode()}>Update Code</button> */}
            <div id="sample-container" className="mt-5 row">

                <div className="column">
                  <h5>Generate sample code in your variant!</h5>
                  <ul>
                    <li><button onClick={() => loadSampleCode(helloWorld)}>Hello, world!</button></li>
                    <li><button onClick={() => loadSampleCode(cat)}>cat</button></li>
                    <li><button onClick={() => loadSampleCode(print0to99)}>print 0 to 99</button></li>
                  </ul>
                </div>

                <div className="column">
                  <h5>Try out these variants!</h5>
                  <ul>
                    <li><button onClick={() => setSymbols(ook)}>Ook!</button></li>
                  </ul>
                </div>
                
              </div>
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
