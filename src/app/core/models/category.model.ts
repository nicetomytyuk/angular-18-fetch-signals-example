import { Product } from "./product.model";

export interface Category {
    name: string,
    image: string,
    products: Product[]
}