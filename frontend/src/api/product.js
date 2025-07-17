const API_URL = "http://localhost:8080/userProduct";
//put '/product' after 8080 if you got an error

export async function addProduct(product) {
    const res = await fetch(`${API_URL}/add-product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem('user')).token
        },
        body: JSON.stringify(product)
    });

    if (!res.ok) {
        throw new Error("Failed to add product");
    }

    const data = await res.json();
    return data;
}

export async function getAllProducts() {
    const res = await fetch(`${API_URL}/showallproduct`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem('user')).token
        }
    });
    const data = await res.json();
    return data;
}


export  async function getSingleProduct(id){
     const res = await fetch(`${API_URL}/product/${id}`,{

        method: "GET",
        headers:{
            "Content-Type":"application/json",
            token : JSON.parse(localStorage.getItem('user')).token
        },
     })
        const data = await res.json();
    return data.product;
}

export  async function updateProduct(id,productData){
     const res = await fetch(`${API_URL}/edit/${id}`,{

        method: "PUT",
        headers:{
            "Content-Type":"application/json",
            token : JSON.parse(localStorage.getItem('user')).token
        },
        body:JSON.stringify(productData)
     })
        const data = await res.json();
    return data.product;
}

export  async function deleteProduct(productId){
     const res = await fetch(`${API_URL}/delete/${productId}`,{

        method: "DELETE",
        headers:{
            "Content-Type":"application/json",
            token : JSON.parse(localStorage.getItem('user')).token
        },
     })
        const data = await res.json();
    return data;
}