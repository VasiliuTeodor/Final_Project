const addNewProductBtn = document.querySelector(".add-product");
let containerOfProducts = document.querySelector(".admin-container");
const updateProductBtn = document.querySelector(".update-product");

const productsURL = "https://61e06d0b63f8fc0017618763.mockapi.io/id/vehicles";

window.addEventListener("load", getAllProducts);

async function getAllProducts() {
  const result = await fetch(productsURL);
  const products = await result.json();

  const tableRows = products
    .map(
      (product) =>
        `<tr class="table-rows">
						<td class="table-row">${product.name}</td>
						<td class="table-row">${product.price}</td>
							<div class="admin-table-btns">
									<td class="table-row"><button class="btn btn-danger delete" data-product-id=${product.id}>Delete
									</button>
									<button class="btn btn-primary edit" data-product-id=${product.id}>Edit
									</button></td>
							</div>
					</tr>
				`
    )
    .join("");

  containerOfProducts.innerHTML = tableRows;
}

containerOfProducts.addEventListener("click", handleProducts);

async function handleProducts(event) {
  const productId = event.target.getAttribute("data-product-id");
  if (event.target.classList.contains("delete")) {
    let response = await fetch(`${productsURL}/${productId}`, {
      method: "DELETE",
    });
    console.log(response);
    getAllProducts();
  } else if (event.target.classList.contains("edit")) {
    console.log("edit", productId);
    editProductById(productId);
  }
}

addNewProductBtn.addEventListener("click", addNewProduct);

async function addNewProduct(event) {
  event.preventDefault();

  const newProductName = document.getElementById("name").value;
  const newProductPrice = document.getElementById("price").value;
  const newProductDescription = document.getElementById("description").value;

  let response = await fetch(productsURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: newProductName,
      price: newProductPrice,
      description: newProductDescription,
    }),
  });

  let product = await response.json();
  console.log("newProduct", product);

  let newProductTableRow = `<tr class="table-rows">
         <td>${product.name}</td>
         <td>${product.price}</td>
         <td><button class="btn btn-danger" data-product-id=${product.id}>Delete
         </button></td>
         <td><button class="btn btn-primary" data-product-id=${product.id}>Edit
         </button></td>
      </tr>`;

  containerOfProducts.innerHTML += newProductTableRow;
}

updateProductBtn.addEventListener("click", updateProduct);

async function updateProduct(event) {
  event.preventDefault();

  const productName = document.getElementById("name").value;
  const productPrice = document.getElementById("price").value;
  const productDescription = document.getElementById("description").value;
  // value from hidden input
  const productId = document.getElementById("product-id").value;

  let response = await fetch(`${productsURL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: productId,
      name: productName,
      price: productPrice,
      description: productDescription,
    }),
  });

  let data = await response.json();
  console.log(data);
  getAllProducts();
}

async function editProductById(productId) {
  const productNameElement = document.getElementById("name");
  const productPriceElement = document.getElementById("price");
  const productDescriptionElement = document.getElementById("description");
  const productIdHiddenElement = document.getElementById("product-id");

  let response = await fetch(`${productsURL}/${productId}`);
  let product = await response.json();

  productNameElement.value = product.name;
  productPriceElement.value = product.price;
  productDescriptionElement.value = product.description;
  productIdHiddenElement.value = product.id;
}
