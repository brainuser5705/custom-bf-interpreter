import { useContext } from "react";
import { SymbolContext } from "../App";

function SymbolField(props){

    const {symbols, setSymbols } = useContext(SymbolContext);
    const symbolName = props.symbolName;

    return <input 
        type="text"
        defaultValue={symbols[symbolName]} 
        onChange={e => {
            symbols[symbolName] = e.target.value;
            setSymbols(symbols);
        }}
    />

}

export { SymbolField };