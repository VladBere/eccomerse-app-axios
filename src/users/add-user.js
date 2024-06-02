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
        avatar: "https://i.pinimg.com/736x/a9/4c/f5/a94cf541b61bcd310827ab03147c22a6.jpg"
    }

    renderUsers([userToAdd])

    axios.post("https://api.escuelajs.co/api/v1/users", userToAdd)
    
    document.querySelector(".modal-backdrop").style.display = "none";
    document.querySelector("#editModal").style.display = "none";
    document.querySelector("body").classList.remove("modal-open")
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("#addUserModal").style.display = "none";
}