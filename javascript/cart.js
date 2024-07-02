let btnCart = document.querySelectorAll('.addCart');
let cartItem = [];

// Check if there is item in localstorage
if(localStorage.getItem('cart_items')) {
    cartItem = JSON.parse(localStorage.getItem('cart_items'));
    
    // Update cart quantity length
    document.querySelector('.totalItem').textContent = cartItem.length
}

btnCart.forEach((button) => {
    button.addEventListener('click', (event) => {
        const cartContainer = event.target.closest('.icecream');
        console.log(cartContainer);

        let cartQuantity = parseInt(document.querySelector('.totalItem').textContent);

        // Update cart quantity
        cartQuantity++;
        document.querySelector('.totalItem').textContent = cartQuantity
        
        const productItem = {
            prdImg: cartContainer.querySelector('.ice_img img').src,
            prdName: cartContainer.querySelector('.ice_info h3').textContent,
            prdPrice: parseFloat(cartContainer.querySelector('.ice_info span').textContent.slice(1))
        }
        console.log(productItem)

        cartItem.push(productItem);
        alert(`${productItem.prdName} has been added to cart`);

        localStorage.setItem('cart_items', JSON.stringify(cartItem));
    })
})