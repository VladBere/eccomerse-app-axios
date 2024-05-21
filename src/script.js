const cardList = document.querySelector("#card-list");
const editForm = document.querySelector(".edit-form")
let editBtns

let editId = null

import { trunc } from "./add-product-axios";

const renderCards = (products) => {
    products.forEach((product) => {
        const cardHTML = ` 
            <div class="card ${product.id}" id="${product.id}" style="width: 18rem;height: 280px;display: block;">
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

import { addProduct } from "./add-product-axios";

import { editProduct } from "./edit-axios";

import { deleteProduct } from "./delete-axios";

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