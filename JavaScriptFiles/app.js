window.addEventListener('scroll', function() {
    let goUpWindows = window.scrollY > 600;

    if (goUpWindows) {
        document.querySelector('.go-up-btn').style.display = 'block';
    }
    else {
        document.querySelector('.go-up-btn').style.display = 'none';
    }
})

// window.open()

async function cards() {
    const cardsUrl = await fetch('https://61e06d0b63f8fc0017618763.mockapi.io/dogs');
    const cards = await cardsUrl.json();

    const productCards = cards.map(product => 
        `<div class="products">
            <img src=${product.image} class="product-images" />
            <h2 class="product-names">${product.name}</h2>
            <a href="/final_project/details.html?id=${product.id}" class="details-btn">Details</a>
        </div>`
        ).join('');

        document.querySelector('#products-container').innerHTML = productCards;
}
  

window.addEventListener('load', cards);


let showMoreBtn = document.querySelector('.show-more-btn');
let arrow = document.querySelector('.arrow');

function showHideCards() {
    
    let showMoreCards = document.querySelector('#products-container');

    if (showMoreCards.style.height > '100vh') {
        showMoreCards.style.height = '100%';
        showMoreBtn.innerHTML = "Show less";
        arrow.style.transform = "rotate(0deg)";
    }
    else {
        showMoreCards.style.height = "105vh";
        showMoreBtn.innerHTML = "Show more";
        arrow.style.transform = "rotate(180deg)";
    }
}

showMoreBtn.addEventListener('click', showHideCards);

// let list = document.querySelectorAll('#products-container>div:nth-child(n+10)');

// function showHideCards() {
//     let showMoreCards = document.querySelector('#products-container');

//     if(showMoreCards) {
//         document.querySelectorAll('#products-container>div:nth-child(n+10)').style.display = 'none';
//     }
  
// }

// showMoreBtn.addEventListener('click', showHideCards);