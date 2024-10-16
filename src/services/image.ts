import supabase from "./supabase";

export async function uploadFile(fileBody: File): Promise<string> {
    const filePath =  Math.random() + '-' + fileBody.name;
    const { error } = await supabase
                            .storage
                            .from('products')
                            .upload(filePath, fileBody, {
                                cacheControl: '3600',
                                upsert: false
                            });

    if(error) {
        console.error(error);
        return "";
    }

    return filePath;
}

export async function postImage(image_path: string, isPrimaryImage: boolean, product_id: number): Promise<void> {
    const { error } = await supabase
                    .from("image")
                    .insert([{
                        image_path,
                        isPrimaryImage,
                        product_id
                    }]);

    if(error) {
        console.error(error);
    }
}

export async function getMainImage(product_id: number): Promise<string> {
    const { data, error } = await supabase
                        .from("image")
                        .select("image_path")
                        .eq("product_id", product_id)
                        .eq("isPrimaryImage", true)
                        .returns<{image_path: string}[]>();
    
    if(error) {
        console.error(error);
        return "";
    }

    if(data.length === 0) return "";

    const url = supabase 
            .storage
            .from("products")
            .getPublicUrl(data[0].image_path);
    

    return url.data.publicUrl;
}

export async function getAllImages(product_id: number): Promise<string[]> {
    const paths: string[] = [];

    const { data, error } = await supabase
                        .from("image")
                        .select("image_path")
                        .eq("product_id", product_id)
                        .order('isPrimaryImage', { ascending: false })
                        .returns<{image_path: string}[]>();
    
    if(error || data === null) {
        console.error(error);
        return [];
    }

    for(const image of data) {
        const url = supabase 
            .storage
            .from("products")
            .getPublicUrl(image.image_path);
        
        paths.push(url.data.publicUrl);
    }    

    return paths;
}