import { useContext, useState } from "react";
import { SymbolContext } from "../App";
import '../App.css';

const symbolDescriptions = {
    "shift_right": "Move pointer to the right",
    "shift_left": "Move pointer to the left",
    "increment": "Increment memory cell at pointer",
    "decrement": "Decrement memory cell at pointer",
    "output": "Output ASCII character at cell where pointer is",
    "input": "Input a character and store ASCII value in cell where pointer is",
    "start_while": "Jump past the matching ] if cell at pointer is 0",
    "end_while": "Jump back to matching [ if cell at pointer is not 0"
}

function SymbolField(props){

    const [invalid, setInvalid] = useState(false);

    const {symbols, setSymbols} = useContext(SymbolContext);
    const symbolName = props.symbolName;

    return (
        <div className="symbol-field">
            <div 
                className="symbol-field-label"
                data-bs-toggle="tooltip" 
                data-bs-placement="right"
                title={symbolDescriptions[symbolName]}
            >{symbolName}</div>
            <textarea
                value={symbols[symbolName]} 
                rows={1}
                columns={40}
                onChange={e => {
                    let newSymbol = e.target.value;
                    if (newSymbol === '' || (Object.values(symbols)).includes(newSymbol)) { // fix replacement bug
                        setInvalid(true);
                    }else{
                        setInvalid(false);
                        symbols[symbolName] = newSymbol;
                        setSymbols(symbols);
                    }

                }}
                className={`align-right ${invalid ? "invalid-symbol-field" : ""}`}
                
            ></textarea>
        </div>
    );
}

export { SymbolField };