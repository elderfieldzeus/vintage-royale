import { ProductDisplay, ProductSpecifics, ProductUpload } from "../utilities/DTO/Product";
import supabase from "./supabase";
import { Category, CategoryFilter } from "../utilities/DTO/Category";
import { getAllImages, getMainImage } from "./image";
import { SortType } from "../utilities/Enum";


export async function getProductPage(callable: (data: ProductDisplay[]) => void, search: string, page: number, limit: number): Promise<void> {
    let productQuery;
    
    if(search === "") {
        productQuery = supabase
            .from("product")
            .select('*')
            .order('created_at', { ascending: false })
            .range(page * limit, (page * limit) + limit - 1)
            .returns<ProductDisplay[]>();
    }
    else {
        const category_ids: number[] = await getSimilarCategory(search);
        let category_string = '';

        category_ids.forEach((cid) => {
            category_string += `category_id.eq.${cid},`;
        });


        productQuery = supabase
            .from("product")
            .select('*')
            .or(`${category_string}title.ilike.%${search}%,description.ilike.%${search}`)
            .range(page * limit, (page * limit) + limit - 1)
            .returns<ProductDisplay[]>();
    }

    const { data, error } = await productQuery;

    if(data !== null) {
        for(const d of data) {
            if(d.id !== undefined) {
                const path = await getMainImage(d.id);
                d.image_path = path;
            }
        }
    }
    
    if(error) {
        console.error(error);
    }
    
    callable(data ? data : []);
}

export async function getFilteredProducts(callable: (data: ProductDisplay[]) => void, page: number, limit: number, categories: CategoryFilter[], sort: SortType): Promise<void> {

    const category_ids: number[] = categories.filter((category) => category.selected === true).map((category) => category.id);
    let category_string = '';

    category_ids.forEach((cid) => {
        category_string += `category_id.eq.${cid},`;
    });

    if(category_string.length > 1) {
        category_string = category_string.slice(0, -1);
    }

    let orderBy: string, ascending: boolean;

    switch(sort) {
        case SortType.NEW:
            orderBy = "created_at";
            ascending = false;
            break;
        case SortType.OLD:
            orderBy = "created_at";
            ascending = true;
            break;
        case SortType.CHEAP:
            orderBy = "price";
            ascending = true;
            break;
        case SortType.EXPENSIVE:
            orderBy = "price";
            ascending = false;
            break;
    }
    

    const productQuery = supabase
        .from("product")
        .select('*')
        .or(category_string)
        .order(orderBy, { ascending })
        .range(page * limit, (page * limit) + limit - 1)
        .returns<ProductDisplay[]>();

    const { data, error } = await productQuery;

    if(data !== null) {
        for(const d of data) {
            if(d.id !== undefined) {
                const path = await getMainImage(d.id);
                d.image_path = path;
            }
        }
    }
    
    if(error) {
        console.error(error);
    }
    
    callable(data ? data : []);
}

export async function postProduct(product: ProductUpload): Promise<number> {
    const { data, error } = await supabase 
                    .from("product")
                    .insert([product])
                    .select("id")
                    .returns<{id: number}[]>();
    
    if(error) {
        console.error(error);
    }

    const id = (error && !data) ? -1 : data[0].id;
    return id;
}

export async function getProductDisplay(product_id: number, callable: (retProduct: ProductDisplay) => void): Promise<void> {
    const { data, error } = await supabase     
                        .from("product")
                        .select("*")
                        .eq("id", product_id)
                        .returns<ProductDisplay[]>();

    if(error || data === null) {
        console.error(error);
        return;
    }

    callable(data[0]);
}

export async function getProductDetails(product_id: number, callable: (retProduct: ProductSpecifics) => void): Promise<void> {
    const { data, error } = await supabase
                        .from("product")
                        .select("*")
                        .eq("id", product_id)
                        .returns<ProductSpecifics[]>();

    if(error || data === null) {
        console.log(error);
        return;
    }

    const images: string[] = await getAllImages(product_id);
    const category_name: string = await getCategoryById(data[0].category_id);

    const product: ProductSpecifics = data[0];

    product.image_paths = images;
    product.category_name = category_name;

    callable(product);
}

export async function getCategoryById(category_id: number): Promise<string> {
    const { data, error } = await supabase    
                        .from("product_category")
                        .select("category_name")
                        .eq("id", category_id)
                        .returns<{category_name: string}[]>();
    
    if(error || data === null) {
        console.log(error);
        return "";
    }

    return data[0].category_name;
}

export async function postCategory(category_name: string): Promise<number> {
    const { data, error } = await supabase
                        .from("product_category")
                        .insert([{
                            category_name
                        }])
                        .select("id")
                        .returns<{id: number}[]>();

    if(error) {
        console.error(error);
    }

    const id = (error && !data) ? -1 : data[0].id;
    return id;
}

export async function getCategories(callable: (categories: Category[]) => void): Promise<void> {
    const { data, error } = await supabase
                        .from("product_category")
                        .select("*")
                        .returns<Category[]>();

    if(error) {
        console.error(error);
    }

    callable(data ? data : []);
}

export async function getProductCount(callable: (max : number) => void): Promise<void> {
    const { count, error } = await supabase 
                        .from("product")
                        .select("*", { count: "exact" });
    
    if(error) {
        console.error(error);
    }

    callable(count ? count : 0);
}

export async function getSimilarCategory(search: string): Promise<number[]> {
    const { data, error } = await supabase 
                        .from("product_category")
                        .select("*")
                        .ilike("category_name", `%${search}%`)
                        .returns<{id: number}[]>();

    if(error || !data) {
        console.error(error);
        return [];
    }

    const ids: number[] = [];

    data.forEach((d) => {
        ids.push(d.id);
    });

    return ids;
}