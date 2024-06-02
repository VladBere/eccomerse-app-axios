const cardList = document.querySelector("#card-list");
const editForm = document.querySelector(".edit-form")
let editBtns
const paginationList = document.querySelector("#pagination-list")
import { editId } from "./products/add-product-axios";

import { trunc } from "./products/add-product-axios";

import { renderCards } from "./products/add-product-axios";

import { addEventListenerCombo } from "./products/add-product-axios";

let deleteBtns = document.querySelectorAll(".delete-btn")

let numOfProducts

axios.get('https://api.escuelajs.co/api/v1/products?offset=0').then(response => {
    numOfProducts = response.data.length
    renderCards([response.data[0],response.data[1],response.data[2],response.data[3],response.data[4],response.data[5],response.data[6],response.data[7],response.data[8],response.data[9],response.data[10],response.data[11]])});

const getProducts = (page = 0) => {
    paginationList.innerHTML = ""
    axios.get(`https://api.escuelajs.co/api/v1/products?limit=12&offset=${page}`)
    .then(response => renderCards(response.data));
    document.querySelector('#user-btns').style.display = "none";
    document.querySelector("#product-btns").style.display = "block";
    pagination()
}

document.querySelector(".edit-close").addEventListener("click", () => editForm.style.display = "none")
document.querySelector(".add-submit").addEventListener("click", () => {
    document.querySelector(".close").style.display = "none"
    document.querySelector(".modal-backdrop").style.display = "none"
    document.querySelector("body").classList.remove("modal-open")
    document.querySelector("body").style.overflow = "auto"
})

////////////////////////////////////////////

let currentPage = 1

const pagination = () => {

    for (let i = 1; i < numOfProducts/12; i++) {

        const paginationBtn = `<a class="page-link btn btn-primary pagination-button" data-btn="${i}" href="#">${i}</a>`

        document.querySelector("#pagination-list").insertAdjacentHTML("beforeend",paginationBtn)
    }

    paginationBtnsAdeventlistener()
}

const paginationBtnsAdeventlistener = () => {
    const nextBtn = document.querySelector("#nextBtn")
    const prevBtn = document.querySelector("#prevBtn")
    const numBtns =  document.querySelectorAll(".pagination-button")

   numBtns.forEach(i => {
    i.addEventListener("click", () => {
        currentPage = i.dataset.btn
        getProducts(currentPage*12)
        
    })
   })

    nextBtn.addEventListener("click", () => {
        currentPage++
        getProducts(currentPage*12)
    })
    prevBtn.addEventListener("click", () => {
        currentPage--
        getProducts(currentPage*12)
    })
}

////////////////////////////////////////////

pagination()

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