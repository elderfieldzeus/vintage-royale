import { CartedItem } from "../utilities/DTO/Order";

const LOCAL_STORAGE_NAME = "items";

export function getCartedItems(): CartedItem[] {
    const stringItems = localStorage.getItem(LOCAL_STORAGE_NAME)
    const cartedItems: CartedItem[] = stringItems ? JSON.parse(stringItems) : [];

    return cartedItems;
}

export function addCartedItem(quantity: number, product_id: number, maxQuantity: number): void {
    const cartedItems = getCartedItems();

    const itemIndex = cartedItems.findIndex((item) => item.product_id === product_id);

    if(itemIndex === -1) {
        cartedItems.push({
            product_id,
            quantity
        });
    }
    else {
        cartedItems[itemIndex].quantity = Math.min(maxQuantity, cartedItems[itemIndex].quantity + quantity);
    }

    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(cartedItems));
}

export function deleteCartItem(product_id: number): void {
    const cartedItems = getCartedItems();

    const findIndex = cartedItems.findIndex((cartedItem) => cartedItem.product_id === product_id);

    if(findIndex !== -1) {
        cartedItems.splice(findIndex, 1);
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(cartedItems))
    }
}

export function changeCartItemQuantity(product_id: number, type: 'up' | 'down', maxQuantity: number): void {
    const cartedItems = getCartedItems();

    const findIndex = cartedItems.findIndex((cartedItem) => cartedItem.product_id === product_id);

    if(findIndex !== -1) {
        const quantity = cartedItems[findIndex].quantity;
        if(type === 'up' && quantity === maxQuantity) return;
        if(type === 'down' && quantity === 0) return;
        
        
        cartedItems[findIndex].quantity = type === 'up' ? quantity + 1 : quantity - 1;
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(cartedItems));
    }
}