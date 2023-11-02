import { UserData } from "../Auth/User/types";

 
export interface IProduct{
    productId: number;
    name: string;
    description: string;
    image: string;
    price: number;
    brand:string;
    appointment:string;
    size:string;
    color:string;
    country:string;
    isMale:boolean;
}

export interface ICartItem{
    quantity:number;
    productId:number;
    product:IProduct;
    user:UserData
}