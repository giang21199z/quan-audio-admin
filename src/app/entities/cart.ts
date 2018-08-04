import { User } from "./user-infor";

export class Cart {
    private user: User;
    private cartItem : any;

    public constructor({user: user, cartItem: cartItem}){
        this.user = user;
        this.cartItem = cartItem;
    }
}