import { cardList } from "../products/add-product-axios";

import { deleteUser } from "./delete-user";

export let editUserId = 1

export const addEventListenerComboUser = () => {
    document.querySelectorAll('.user-delete').forEach((item) => {
        item.addEventListener("click", () => deleteUser(item.dataset.user))
    })
    document.querySelectorAll(".user-edit").forEach((item) => {
        item.addEventListener("click",async () => {
            document.querySelector(".modal-backdrop").style.display = "block";
            document.querySelector("#editModal").style.display = "block";
            editUserId = item.dataset.user
            let data
            await axios.get(`https://api.escuelajs.co/api/v1/users/${item.dataset.user}`)
            .then(response => data = response.data)
            document.querySelector("#edit-user-email").value = data.email
            document.querySelector("#edit-user-password").value = data.password
            document.querySelector("#edit-user-name").value = data.name
            document.querySelector("#edit-user-role").value = data.role
        })
    })
}

export const renderUsers = (users) => {
    users.forEach((user) => {
        const cardHTML = `
        <div class="card" id=${user.id} style="width: 18rem;">
            <img src="${user.avatar}" class="card-img-top" alt="${user.name}">
            <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">${user.role}</p>
                <a href=${user.email}>${user.email} </a><br>
                <button data-user=${user.id} type="button" class="btn btn-danger user-delete"><img src="../icons/trash.svg" alt=""></button>
                <button data-user=${user.id} type="button" class="btn btn-warning user-edit" data-bs-toggle="modal" data-bs-target="#editModal"><img src="../icons/edit.svg" alt=""></button>
            </div>
        </div>
        `;

        cardList.insertAdjacentHTML("beforeend", cardHTML);

        addEventListenerComboUser()
    });
    
}

export const getUsers = () => {
    cardList.innerHTML = ""
    axios.get("https://api.escuelajs.co/api/v1/users").then(response => renderUsers(response.data))
    document.querySelector('#user-btns').style.display = "block";
    document.querySelector("#product-btns").style.display = "none"
} 