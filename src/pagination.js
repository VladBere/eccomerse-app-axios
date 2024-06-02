const numOfProducts = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0').then(response => response.data.length)

let currentPage = 1

const pagination = () => {
    const paginationList = document.querySelector("#pagination-list")

    for (let i = 1; i < numOfProducts; i++) {
        paginationList.innerHTML = ""

        const paginationBtn = `<a class="page-link pagination-button" href="#">${i}</a>`

        paginationList.insertAdjacentHTML("beforeend",paginationBtn)

        document.querySelector(".pagination-button").addEventListener("click", () => {
            currentPage = i
            getProducts(currentPage*12)
        })
    }

    paginationBtnsAdeventlistener
}

const paginationBtnsAdeventlistener = () => {
    const nextBtn = document.querySelector("#nextBtn")
    const prevBtn = document.querySelector("#prevBtn")

    nextBtn.addEventListener("click", () => {
        currentPage++
        getProducts(currentPage*12)
    })
    prevBtn.addEventListener("click", () => {
        currentPage--
        getProducts(currentPage*12)
    })
}