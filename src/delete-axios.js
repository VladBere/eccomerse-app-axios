export const deleteProduct = (id) => {
    document.getElementById(id).style.display = "none";

    axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
}
