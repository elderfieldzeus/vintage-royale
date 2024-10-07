import supabase from "./supabase";

export async function signIn(
    email: string,
    password: string,
    callable: (status: boolean) => void
): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error) {
        console.error(error);
    }

    callable(error === null ? true : false);
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error(error);
    }
}

export async function isLoggedIn(
    callback: (status: boolean) => void
) {
    const { data, error } = await supabase.auth.getUser();

    if(error) {
        console.error(error);
    }

    callback(data.user !== null ? true : false);
}