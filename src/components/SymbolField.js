import { useContext } from "react";
import { SymbolContext } from "../App";
import '../App.css';

function SymbolField(props){

    const {symbols, setSymbols } = useContext(SymbolContext);
    const symbolName = props.symbolName;

    return (
        <div className="symbol-field">
            <span className="symbol-field-label">{symbolName}</span>
            <input 
                type="text"
                defaultValue={symbols[symbolName]} 
                onChange={e => {
                    symbols[symbolName] = e.target.value;
                    setSymbols(symbols);
                }}
                size="10"
                className="align-right"
            />
        </div>
    );
}

export { SymbolField };