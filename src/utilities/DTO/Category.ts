export interface Category {
    id: number;
    category_name: string;
}

export interface CategoryUpload {
    category_name: string;
}

export interface CategoryFilter extends Category {
    selected: boolean;
}