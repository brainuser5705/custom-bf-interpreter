class Evaluator{

    constructor(){
        this.arr = new Array(3000).fill(0); // don't need to initialize with size
        this.index = 0;
        this.output = "";
    }

    evalExp(exp){
        let type = exp[0];

        switch(type){
            case "shift_right":
                this.index++;
                break;
            case "shift_left":
                if (this.index !== 0){
                    this.index--;
                }else{
                    console.error("Negative index");
                }
                break;
            case "increment":
                this.arr[this.index] += 1;
                break;
            case "decrement":
                this.arr[this.index] -= 1;
                break;
            case "output":
                this.output += String.fromCharCode(this.arr[this.index]);
                break;
            case "input":
                let entered = '';
                while (entered !== null && entered.length !== 1){
                    entered = prompt("Enter a character.");
                }
                this.arr[this.index] = entered.charCodeAt(0);
                break;
            case "while":
                while (this.arr[this.index] !== 0){
                    let expression_list = exp[1];
                    this.evalIter(expression_list);
                }
                break;
            default:
                break;
        }
    }

    evalIter(exp_list){
        for (let exp of exp_list){
            this.evalExp(exp);
        }
    }

}

function evaluate(tokens){
    let evaluator = new Evaluator();
    console.log("Created new evaluator")
    evaluator.evalIter(tokens);
    return evaluator.output;
}

export {evaluate};