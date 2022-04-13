let searchParamString = window.location.search;
const searchParam = new URLSearchParams(searchParamString);
const productId = searchParam.get("id");

window.addEventListener("load", async function () {
  const result = await fetch(
    `https://61e06d0b63f8fc0017618763.mockapi.io/id/vehicles/${productId}`
  );
  const product = await result.json();

  const productCard = `
        <div class="product-card">
            <div class="name-and-desc">
                <h2 class="product-name">${product.name}</h2>
                <span class="product-description">${product.description}</span>
            </div>
            <div class="img">
                <img src=${product.imageURL} class="product-image" />
                <div class="background-image"></div>
            </div>
           
            <div class="price-and-btn">
                <span class="product-price">${product.price} lei</span>
                <button data-id=${product.id} class="add-to-cart">Add to cart</button>
            </div>
            <div class="succes-mesage">Product added to cart</div>
        </div>
    `;
  document.querySelector(".product").innerHTML = productCard;
});

async function addToCart(event) {
  const addToCartBtn = event.target;
  const getProductId = addToCartBtn.getAttribute("data-id");
  let succesMesage = document.querySelector(".succes-mesage");

  const result = await fetch(
    `https://61e06d0b63f8fc0017618763.mockapi.io/id/vehicles/${getProductId}`
  );
  const product = await result.json();

  let cart = [];

  if (addToCartBtn.classList.contains("add-to-cart")) {
    if (localStorage.getItem("cart") == null) {
      cart.push({ ...product, noOfProducts: 1 });
    } else {
      cart = JSON.parse(localStorage.getItem("cart"));
      const productInCart = cart.find(
        (productFromCart) => productFromCart.id == product.id
      );
      if (productInCart != undefined) {
        productInCart.noOfProducts++;
        console.log("Produsul exista in cos");
      } else {
        const productToBeAddedInCart = { ...product, noOfProducts: 1 };
        cart.push(productToBeAddedInCart);
        console.log("Produsul tocmai a fost adaugat in cos");
      }
    }
    succesMesage.style.visibility = "visible";
    setInterval(() => {
      succesMesage.style.visibility = "hidden";
    }, 1500);
  } else {
    console.log("Product failed to add");
  }

  if (cart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.querySelector(".product").addEventListener("click", addToCart);
