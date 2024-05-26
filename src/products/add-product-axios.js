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
            <div class="card ${product.id}" id="${product.id}" style="width: 18rem;min-height: 280px;display: block;">
            <img src="${product.images[0]}" class="card-img-top" alt="${product.title}" />
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">
                       ${trunc(product.description, 100)}
                    </p>
                    <button class="btn btn-danger delete-btn" data-btn="${product.id}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 6H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="btn btn-warning edit-btn" data-btn="${product.id}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.49998C18.8978 2.10216 19.4374 1.87866 20 1.87866C20.5626 1.87866 21.1022 2.10216 21.5 2.49998C21.8978 2.89781 22.1213 3.43737 22.1213 3.99998C22.1213 4.56259 21.8978 5.10216 21.5 5.49998L12 15L8 16L9 12L18.5 2.49998Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
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