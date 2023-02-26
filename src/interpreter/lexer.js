import { PeekableStream } from './stream';

// function* defines a generator
function* lex (charSequence) {

    let stream = new PeekableStream(charSequence); // doesn't work for default?

    while (stream.pointer != null){
        let c = stream.dispense_char();
        // console.log("Lexing " + c);

        switch(c){
            case ">":
                yield "shift_right";
                break;
            case "<":
                yield "shift_left";
                break;
            case "+":
                yield "increment";
                break;
            case "-":
                yield "decrement";
                break;
            case ".":
                yield "output";
                break;
            case ",":
                yield "input";
                break;
            case "[":
                yield "start_while";
                break;
            case "]":
                yield "end_while";
                break;
            default:
                break;
        }
            
    }
}

export {lex};