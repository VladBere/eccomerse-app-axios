const cardList = document.querySelector("#card-list");
const editForm = document.querySelector(".edit-form")
let editBtns

let editId = null

import { trunc } from "./products/add-product-axios";

import { renderCards } from "./products/add-product-axios";

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

axios.get('https://api.escuelajs.co/api/v1/products?offset=0').then(response => renderCards(response.data));

const getProducts = () => {
    cardList.innerHTML = ""
    axios.get('https://api.escuelajs.co/api/v1/products?offset=0').then(response => renderCards(response.data));
    document.querySelector('#user-btns').style.display = "none";
    document.querySelector("#product-btns").style.display = "block";
}

document.querySelector(".edit-close").addEventListener("click", () => editForm.style.display = "none")
document.querySelector(".add-submit").addEventListener("click", () => {
    document.querySelector(".close").style.display = "none"
    document.querySelector(".modal-backdrop").style.display = "none"
    document.querySelector("body").classList.remove("modal-open")
    document.querySelector("body").style.overflow = "auto"
})

const addBtn = document.querySelector("#add-btn");
const addProductForm = document.querySelector("#add-product-form");

import { addProduct } from "./products/add-product-axios";

import { editProduct } from "./products/edit-axios";

import { deleteProduct } from "./products/delete-axios";

document.querySelector(".edit-sumbit").addEventListener("click", () => {
    editForm.style.display = "none"
})

import { getUsers } from "./users/get-users";
import { renderUsers } from "./users/get-users";

document.querySelector("#show-users").addEventListener("click", getUsers)
document.querySelector("#show-products").addEventListener("click", getProducts)

import { addUser } from "./users/add-user";

import { editUser } from "./users/edit-user";
import { editUserId } from "./users/get-users";

document.querySelector("#user-add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addUser()
})
document.querySelector("#user-edit-form").addEventListener("submit", (e) => {
    e.preventDefault()
    editUser(editUserId)
})

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addProduct();
});
editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    editProduct(editId)
})