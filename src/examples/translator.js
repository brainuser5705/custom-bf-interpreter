// import { PeekableStream } from '../interpreter/stream';

// function scan(symbols, first_char, stream){
//     let ret = first_char
//     let next_char = stream.pointer

//     while (next_char !== null && !Object.values(symbols).includes(ret)){
//         ret += stream.dispense_char()
//         next_char = stream.pointer
//     }

//     return ret
// }

function translateFromBf(bfCode, symbols){

    // let stream = new PeekableStream(bfCode);

    var translated = "";
    for (let c of bfCode){
        //let c = scan(symbols, stream.dispense_char(), stream);

        switch(c){
            case ">":
                translated += symbols["shift_right"];
                break;
            case "<":
                translated += symbols["shift_left"];
                break;
            case "+":
                translated += symbols["increment"];
                break;
            case "-":
                translated += symbols["decrement"];
                break;
            case ".":
                translated += symbols["output"];
                break;
            case ",":
                translated += symbols["input"];
                break;
            case "[":
                translated += symbols["start_while"];
                break;
            case "]":
                translated += symbols["end_while"];
                break;
            default:
                break;
        }

    }

    return translated;
}

// function translateToBf(code, symbols){

//     let stream = new PeekableStream(code);

//     var translated = "";
//     while(stream.pointer !== null){
//         let c = scan(symbols, stream.dispense_char(), stream);

//         switch(c){
//             case symbols["shift_right"]:
//                 translated += ">";
//                 break;
//             case symbols["shift_left"]:
//                 translated += "<";
//                 break;
//             case symbols["increment"]:
//                 translated += "+";
//                 break;
//             case symbols["decrement"]:
//                 translated += "-";
//                 break;
//             case symbols["output"]:
//                 translated += ".";
//                 break;
//             case symbols["input"]:
//                 translated += ",";
//                 break;
//             case symbols["start_while"]:
//                 translated += "[";
//                 break;
//             case symbols["end_while"]:
//                 translated += "]";
//                 break;
//             default:
//                 break;
//         }

//     }

//     return translated;

// }

export { translateFromBf /*, translateToBf */ };