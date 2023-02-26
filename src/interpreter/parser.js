import { PeekableStream } from "./stream";

class Parser {

    constructor(token_stream){
        this.tokens = token_stream;
    }

    next_expression(){
        console.log("Tokens: " + this.tokens);
        let type = this.tokens.pointer;
        
        this.tokens.dispense_char();

        switch(type){
            case "start_while":
                return ["while", this.get_multiple_expressions()];
            case "end_while":
                throw new Error(" ']' does not have a matching '['");
            default:
                return [type, []];
        }

    }

    get_multiple_expressions(){

        let exps = [];
        
        let type = this.tokens.pointer; 

        if (type !== "end_while"){ // if the while is not empty

            let exp_parser = new Parser(this.tokens);

            while (type !== "end_while"){
                let exp = exp_parser.next_expression();

                if (exp !== null){
                    exps.push(exp);
                }else{
                    throw new Error("Missing ']'");
                }

                type = exp_parser.tokens.pointer;
            }
        }

        this.tokens.dispense_char(); // ignore ']'

        return exps;

    }
}

function* parse(token_stream){
    let parser = new Parser(new PeekableStream(token_stream));
    while (parser.tokens.pointer !== null){
        let exp = parser.next_expression();
        if (exp !== null){
            yield exp;
        }
    }
}

export {parse};