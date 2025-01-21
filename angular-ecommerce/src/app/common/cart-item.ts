import { Product } from "./product";

export class CartItem {
    id : string;
    name : string;
    ImageUrl : string;
    unitPrice : number;
    quantity : number;


    constructor(product : Product){
        this.id = product.id.toString();
        this.name = product.name;
        this.ImageUrl = product.imageUrl;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
    }
}
