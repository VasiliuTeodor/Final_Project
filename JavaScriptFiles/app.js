window.addEventListener("scroll", function () {
  let goUpWindows = window.scrollY > 600;

  if (goUpWindows) {
    document.querySelector(".go-up-btn").style.display = "block";
  } else {
    document.querySelector(".go-up-btn").style.display = "none";
  }
});

// window.open()

const searchBar = document.querySelector(".search-input");
let cardsForPorducts = [];

async function cards() {
  const cardsUrl = await fetch(
    "https://61e06d0b63f8fc0017618763.mockapi.io/id/dogs"
  );
  cardsForPorducts = await cardsUrl.json();

  const productCards = cardsForPorducts
    .map(
      (product) =>
        `<div class="products">
            <img src=${product.image} class="product-images" />
            <h2 class="product-names">${product.name}</h2>
            <a href="details.html?id=${product.id}" class="details-btn">Details</a>
        </div>`
    )
    .join("");

  document.querySelector("#products-container").innerHTML = productCards;
}
try {
  cards();
} catch (error) {
  console.error(error);
}

function searchProducts(event) {
  const search = event.target.value.toLowerCase();

  if (event.key == "Enter") {
    const filteredProducts = cardsForPorducts.filter((product) => {
      return product.name.toLowerCase().includes(search);
    });
    console.log(filteredProducts);

    document.querySelector("#products-container").innerHTML = filteredProducts;
  }
}

searchBar.addEventListener("keyup", searchProducts);

let showMoreBtn = document.querySelector(".show-more-btn");
let arrow = document.querySelector(".arrow");

function showHideCards() {
  let showMoreCards = document.querySelector("#products-container");

  if (showMoreCards.style.height > "100vh") {
    showMoreCards.style.height = "100%";
    showMoreBtn.innerHTML = "Show less";
    arrow.style.transform = "rotate(0deg)";
  } else {
    showMoreCards.style.height = "105vh";
    showMoreBtn.innerHTML = "Show more";
    arrow.style.transform = "rotate(180deg)";
  }
}

showMoreBtn.addEventListener("click", showHideCards);
