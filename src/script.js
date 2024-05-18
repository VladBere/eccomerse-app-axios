const cardList = document.querySelector("#card-list");
const editForm = document.querySelector(".edit-form")
let editBtns

let editId = null

const trunc = (text, maxLenght) =>
    text?.length > maxLenght ? text?.substring(0, maxLenght - 3) + "..." : text;

const renderCards = (products) => {
    products.forEach((product) => {
        const cardHTML = ` 
            <div class="card ${product.id}" id="${product.id}" style="width: 18rem; display: block;">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.title}" />
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">
                       ${trunc(product.description, 100)}
                    </p>
                    <button class="btn btn-primary delete-btn" data-btn="${product.id}"> Delete </button>
                    <button class="btn btn-primary edit-btn" data-btn="${product.id}"> Edit </button>
                </div>
            </div>`;

        cardList.insertAdjacentHTML("beforeend", cardHTML);
    });
    addEventListenerCombo()
};

const addEventListenerCombo = () => {
    deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach((item) => {
            item.addEventListener("click", () => deleteProduct(item.dataset.btn));
        });
        editBtns = document.querySelectorAll(".edit-btn");
        editBtns.forEach((item) => {
            item.addEventListener("click",() => {
                editForm.style.display = "block";
                editId = item.dataset.btn
            })
        });
}

let deleteBtns = document.querySelectorAll(".delete-btn")

axios.get('https://api.escuelajs.co/api/v1/products?offset=0')
.then(response => renderCards(response.data));

document.querySelector(".edit-close").addEventListener("click", () => editForm.style.display = "none")
document.querySelector(".add-submit").addEventListener("click", () => {
    document.querySelector(".close").style.display = "none"
    document.querySelector(".modal-backdrop").style.display = "none"
    document.querySelector("body").classList.remove("modal-open")
    document.querySelector("body").style.overflow = "auto"
})

const addBtn = document.querySelector("#add-btn");
const addProductForm = document.querySelector("#add-product-form");

const addProduct = () => {
    const title = document.querySelector("#product-title").value;
    const description = document.querySelector("#product-descr").value;
    const price = +document.querySelector("#product-price").value;
    const categoryId = +document.querySelector("#product-category").value;

    const productToAdd = {
        title,
        description,
        price,
        categoryId,
        images: ["https://placeimg.com/640/480/any"],
    };

    renderCards([productToAdd])

    axios.post("https://api.escuelajs.co/api/v1/products", productToAdd)
};

const deleteProduct = (id) => {
    document.getElementById(id).style.display = "none";

    axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
}

const editProduct = (id) => {
    
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

document.querySelector(".edit-sumbit").addEventListener("click", () => {
    editForm.style.display = "none"
})

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
});
editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    editProduct(editId)
})