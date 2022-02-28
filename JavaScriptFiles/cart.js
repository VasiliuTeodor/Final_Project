window.addEventListener('load', () => {
    const products = JSON.parse(localStorage.getItem('cart'));
    
    const productsCard = products.map(product =>
        `<div class="product-carts">
            <div class="product-image">
                <img src=${product.image} class="product-cart-image" />
            </div>
            <div class="product-name">
                <h1 class="product-card-name">${product.name}</h1>
            </div>
            <div class="btn-and-quantity">
                <button class="minus" data-id=${product.id}>-</button>
                <span class="product-quantity">${product.noOfProducts}</span>
                <button class="plus" data-id=${product.id}>+</button>
            </div>
            <div class="product-price">
                <span class="product-card-price">${product.price * product.noOfProducts} lei</span>
                <div class="remove-product">
                    <button class="remove-product-btn" data-id=${product.id}>Remove</button>
                </div>
            </div>
        </div>`
    ).join('');

    let totalPrice = 0;
    products.forEach((product) => {
        totalPrice += Number(product.price) * Number(product.noOfProducts);
    });

    const totalPriceDiv = `
        <div class="total-price-card">
            <div class="total-price-text">
                <span class="text">Sub-total</span>
                <p class="products-number">${products.length} items</p>
            </div>
            <div class="total-price">
                <span class="show-total-price">${totalPrice} lei</span>
            </div>
        </div>
    `
    
    document.querySelector('.total-price').innerHTML = totalPriceDiv;
    document.querySelector('.product-cart').innerHTML = productsCard;
});

function changeQuantityOfProduct (event) {
    const changeQuantityBtn = event.target;
    const products = JSON.parse(localStorage.getItem('cart'));
    let cart = JSON.parse(localStorage.getItem('cart'));
    const productInCart = cart.find((productFromCart) => 
        productFromCart.id == changeQuantityBtn.getAttribute('data-id')
    );
    let quantity = changeQuantityBtn.parentNode;

    if (changeQuantityBtn.classList.contains('plus')) {
        productInCart.noOfProducts++;
        window.location.reload();
    } else if (changeQuantityBtn.classList.contains('minus')) {
        if (productInCart.noOfProducts > 1) {
            productInCart.noOfProducts--;
            window.location.reload();
        }
    } else if (changeQuantityBtn.classList.contains('remove-product-btn')) {
        productInCart.noOfProducts = 0;
        cart = cart.filter((product) => product.id != productInCart.id);
        changeQuantityBtn.parentNode.remove();
        window.location.reload();
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if(cart.length == 0) {
        localStorage.removeItem('cart', JSON.stringify(cart));
    }
}

document.querySelector('.product-cart').addEventListener('click', changeQuantityOfProduct);