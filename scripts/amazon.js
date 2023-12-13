

let productHtml = "";

products.forEach((product) => {
    productHtml += `
        <div class="product-container">
            <div class="product-image-container">
                <img
                    class="product-image"
                    src="${product.image}"
                />
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
            <div class="product-rating-container">
                <img
                    class="product-rating-stars"
                    src="images/ratings/rating-${product.rating.stars * 10}.png"
                />
                <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
            <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart added-${product.id}">
                <img src="images/icons/checkmark.png" />
                Added
            </div>
            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `
})

const productGrid = document.querySelector(".products-grid");
productGrid.innerHTML = productHtml

let interval;
const addtoCart = document.querySelectorAll(".add-to-cart-button");
addtoCart.forEach((btn) => {
    btn.addEventListener("click", () => {
        const productId = btn.dataset.productId;
        const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
        let matchingItem;
        cart.forEach(item => {
            if (item.productId === productId) {
                matchingItem = item;
            }
        })

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity })
        }

        let cartQuantity = 0;
        cart.forEach(item => {
            cartQuantity += item.quantity;
        })

        document.querySelector(".cart-quantity").innerHTML = cartQuantity;
        const added = document.querySelector(`.added-${productId}`);
        added.style.opacity = "100";
        interval = setTimeout(() => {
            added.style.opacity = "0";
        }, 2000);
        
        console.log({cartQuantity, cart});
    })
    clearInterval(interval);
})

