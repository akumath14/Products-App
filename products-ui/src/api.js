const BASE_URL = 'http://localhost:8080/api';

export const getProducts = async() => {
    const res = await fetch(`${BASE_URL}/products`);
    if(!res.ok) {
        throw new Error("Failed to fetch products")
    }
    return res.json();
    
    
}

export const addProduct = async(name) => {
    const res = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
    const data = await res.json();
     if(!res.ok) {
        throw data;
    }
    return data; 
}