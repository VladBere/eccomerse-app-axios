import { renderUsers } from "./get-users";
import { cardList } from "../products/add-product-axios";

export const addUser = () => {
    const email = document.querySelector("#add-user-email").value
    const password = document.querySelector("#add-user-password").value
    const name = document.querySelector("#add-user-name").value
    const role = document.querySelector("#add-user-role").value

    const userToAdd = {
        email,
        name,
        password,
        role,
        avatar: "https://static9.depositphotos.com/1000956/1135/i/450/depositphotos_11352730-stock-photo-square-apple.jpg"
    }

    renderUsers([userToAdd])

    axios.post("https://api.escuelajs.co/api/v1/users", userToAdd)
    
    document.querySelector(".modal-backdrop").style.display = "none";
    document.querySelector("#editModal").style.display = "none";
    document.querySelector("body").classList.remove("modal-open")
    document.querySelector("body").style.overflow = "auto";
}