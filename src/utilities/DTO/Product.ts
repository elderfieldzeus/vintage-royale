export interface Product {
    id: number;
    created_at: Date;
    title: string;
    price: number;
    category_id: number;
} 

export interface ProductDisplay extends Product {
    image_path: string;
    in_stock: number;
}

export interface ProductCart extends ProductDisplay {
    quantity: number;
}

export interface ProductUpload {
    title: string;
    price: number;
    in_stock: number;
    description: string;
    category_id: number;
}

export interface ProductSpecifics extends Product {
    image_paths: string[];
    description: string;
    in_stock: number;
    category_name: string;
}