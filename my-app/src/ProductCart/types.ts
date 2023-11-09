import { UserData } from "../Auth/User/types";

 
export interface IProduct{
    productId: number;
    name: string;
    description: string;
    image: string;
    initialPrice:number;
    price: number;
    discount:number
    brand:string;
    appointment:string;
    size:string;
    color:string;
    country:string;
    countryId:number;
    gender:string;
}

export interface ICartItem{
    quantity:number;
    productId:number;
    product:IProduct;
    user:UserData
}