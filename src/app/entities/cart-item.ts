import { Audio } from "./audio";

export class CartItem {
    private audio: Audio;
    private amount: number;
    private total: number;

    public constructor({audio, amount}){
        this.audio = audio;
        this.amount = amount;
        this.total = this.audio.getPrice() * this.amount;
    }

    public getPrice(){
        return this.audio.getPrice() * this.amount;
    }
    
    public getAudio(){
        return this.audio;
    }

    public getAmount(){
        return this.amount;
    }
}