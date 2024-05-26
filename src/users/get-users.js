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
                <button data-user=${user.id} type="button" class="btn btn-danger user-delete"> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button data-user=${user.id} type="button" class="btn btn-warning user-edit" data-bs-toggle="modal" data-bs-target="#editModal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
                </button>
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