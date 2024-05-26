import { renderUsers } from "./get-users";
import { getUsers } from "./get-users";

export const editUser = async (id) => {
    const email = document.querySelector("#edit-user-email").value
    const password = document.querySelector("#edit-user-password").value
    const name = document.querySelector("#edit-user-name").value
    const role = document.querySelector("#edit-user-role").value

    const editedUser = {
        email,
        name,
        password,
        role,
        avatar: "https://static9.depositphotos.com/1000956/1135/i/450/depositphotos_11352730-stock-photo-square-apple.jpg"
    }

    await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, editedUser)

    getUsers()

    document.querySelector(".modal-backdrop").style.display = "none";
    document.querySelector("#editModal").style.display = "none";
    document.querySelector("body").classList.remove("modal-open")
    document.querySelector("body").style.overflow = "auto";
}