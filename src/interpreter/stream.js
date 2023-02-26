class PeekableStream {

    constructor(stream){
        this.stream = stream;
        this.index = 0;
        this.fill_pointer();
    }

    fill_pointer(){
        if (this.index === this.stream.length){
            this.pointer = null;
        }else{
            this.pointer = this.stream[this.index];
        }
    }

    dispense_char(){
        let c = this.pointer;
        this.index++;
        this.fill_pointer();
        return c;
    }

}

export {PeekableStream};