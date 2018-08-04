import { CartItem } from "./cart-item";

export class User {
    fullname: string;
    phone: string;
    email: string;
    address: string;
    message: string;
    cart: [CartItem];

    public constructor(
        {
            fullname: fullname, phone: phone, email: email,
            address: address, message: message, cart: cart
        }
    ){
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.message = message;
        this.cart = cart;
    }
}