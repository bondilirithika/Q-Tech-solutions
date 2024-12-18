let cart = [];
let cartTotal = 0;

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items-list");
    const cartItemsCount = document.getElementById("cart-items");
    const cartTotalSpan = document.getElementById("cart-total");

    cartList.innerHTML = "";
    cartTotal = 0;
    let itemsCount = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${item.quantity}x ${item.name}</span>
            <span>Rs.${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartList.appendChild(listItem);

        cartTotal += item.price * item.quantity;
        itemsCount += item.quantity;
    });

    cartItemsCount.innerText = itemsCount;
    cartTotalSpan.innerText = cartTotal.toFixed(2);
}

function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    cartPanel.classList.toggle("hidden");
}
