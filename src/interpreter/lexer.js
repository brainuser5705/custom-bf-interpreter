import { PeekableStream } from './stream';

// function* defines a generator
function* lex (symbols, charSequence) {

    let stream = new PeekableStream(charSequence); // doesn't work for default?

    while (stream.pointer != null){
        let c = stream.dispense_char();

        switch(c){
            case symbols["shift_right"]:
                yield "shift_right";
                break;
            case symbols["shift_left"]:
                yield "shift_left";
                break;
            case symbols["increment"]:
                yield "increment";
                break;
            case symbols["decrement"]:
                yield "decrement";
                break;
            case symbols["output"]:
                yield "output";
                break;
            case symbols["input"]:
                yield "input";
                break;
            case symbols["start_while"]:
                yield "start_while";
                break;
            case symbols["end_while"]:
                yield "end_while";
                break;
            default:
                break;
        }
            
    }
}

export {lex};