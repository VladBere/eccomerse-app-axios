export const editProduct = (id) => {
    
    const title = document.querySelector(".edit-title").value;
    const description = document.querySelector(".edit-descr").value;
    const price = +document.querySelector(".edit-price").value;
    const categoryId = +document.querySelector(".edit-category").value;

    const editedProduct = {
        title,
        description,
        price,
        categoryId,
        images: ["https://placeimg.com/640/480/any"],
    }

    document.getElementById(id).innerHTML = ` 
        <div class="card ${id}" id="${id}" style="width: 18rem; height: 280px; display: block;">
        <img src="${editedProduct.images[0]}" class="card-img-top" alt="${editedProduct.title}" />
            <div class="card-body">
                <h5 class="card-title">${editedProduct.title}</h5>
                <p class="card-text">
                    ${trunc(editedProduct.description, 100)}
                </p>
                <button class="btn btn-primary delete-btn" data-btn="${id}"> Delete </button>
                <button class="btn btn-primary edit-btn" data-btn="${id}"> Edit </button>
            </div>
        </div>`
        
    addEventListenerCombo()

    axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, editedProduct)
}
import { trunc } from "./add-product-axios";
import { addEventListenerCombo } from "./add-product-axios";