export interface Product {
    id: number;
    created_at: Date;
    title: string;
    price: number;
    in_stock: number;
    category_id: number;
} 

export interface ProductDisplay extends Product {
    image_path: string;
}

export interface ProductUpload {
    title: string;
    price: number;
    in_stock: number;
    category_id: number;
}