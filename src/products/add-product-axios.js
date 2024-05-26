export const cardList = document.querySelector("#card-list");

export const addProduct = () => {
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

export const renderCards = (products) => {
    products.forEach((product) => {
        const cardHTML = ` 
            <div class="card ${product.id}" id="${product.id}" style="width: 18rem;height: 280px;display: block;">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.title}" />
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">
                       ${trunc(product.description, 100)}
                    </p>
                    <button class="btn btn-danger delete-btn" data-btn="${product.id}"> <img src="../icons/trash.svg" alt=""> </button>
                    <button class="btn btn-warning edit-btn" data-btn="${product.id}"> <img src="../icons/edit.svg" alt=""> </button>
                </div>
            </div>`;

        cardList.insertAdjacentHTML("beforeend", cardHTML);
    });
    addEventListenerCombo()
};

export const trunc = (text, maxLenght) =>
    text?.length > maxLenght ? text?.substring(0, maxLenght - 3) + "..." : text;

export let deleteBtns = document.querySelectorAll(".delete-btn")
export let editBtns
export const editForm = document.querySelector(".edit-form")
export let editId 

export const addEventListenerCombo = () => {
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