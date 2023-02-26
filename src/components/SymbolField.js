import { useContext, useState } from "react";
import { SymbolContext } from "../App";
import '../App.css';


function SymbolField(props){

    const [invalid, setInvalid] = useState(false);

    const {symbols, setSymbols} = useContext(SymbolContext);
    const symbolName = props.symbolName;

    return (
        <div className="symbol-field">
            <span className="symbol-field-label">{symbolName}</span>
            <input 
                type="text"
                value={symbols[symbolName]} 
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
                size="10"
                className={`align-right ${invalid ? "invalid-symbol-field" : ""}`}
            />
        </div>
    );
}

export { SymbolField };