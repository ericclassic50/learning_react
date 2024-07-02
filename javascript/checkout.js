let getProduct = JSON.parse(localStorage.getItem('cart_items') || '[]');
let parentProduct = document.querySelector('.all_items');

let totalPrice = document.querySelector('.totalCount');
let btnPrice = document.querySelector('.btnCheck');
let itemLength = document.getElementById('checkout_length')

itemLength.textContent = getProduct.length

let total = 0;

let noItem = document.querySelector('.no_cart');
noItem.querySelector('button').addEventListener('click', () => {
    window.location = 'icecream.html'
})

if (getProduct.length <= 0) {
    noItem.style.display = 'flex';
}
else {
    noItem.style.display = 'none';

    getProduct.forEach((product, prdId) => {
        let cartList = document.createElement('div');
        cartList.classList.add('cart_list');
    
        console.log(cartList);
    
        total += parseFloat(product.prdPrice);
        totalPrice.textContent = `$${total}`;
        btnPrice.textContent = `Checkout ($${total})`;
    
        cartList.innerHTML = `<div class="cart_details">
                                <div class="cart_img">
                                    <img src=${product.prdImg} alt="">
                                </div>
                                <div class="cart_info">
                                    <h3>${product.prdName}</h3>
                                    <span>${product.prdPrice}</span>
                                </div>
                            </div>
                            <div class="cart_quantity">
                                <div class="delete">
                                    <span>Delete</span>
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                <div class="quantity">
                                    <div class="minus">
                                        <span>-</span>
                                    </div>
                                    <div class="number">
                                        <span>0</span>
                                    </div>
                                    <div class="add">
                                        <span>+</span>
                                    </div>
                                </div>
                            </div>`;
    
        let minus = cartList.querySelector('.minus');
        let add = cartList.querySelector('.add');
        let numberValue = cartList.querySelector('.number');
    
        let del = cartList.querySelector('.delete');
    
        let number = 1;
    
        numberValue.innerHTML = number;
    
        minus.addEventListener('click', () => {
            if (number > 1) {
                number--;
                numberValue.innerText = number;
                total -= parseFloat(product.prdPrice);
                totalPrice.textContent = `$${total}`;
                btnPrice.textContent = `Checkout ($${total})`;
            }
        });
    
        add.addEventListener('click', () => {
            if (number < 20) {
                number++;
                numberValue.innerText = number;
                total += parseFloat(product.prdPrice);
                totalPrice.textContent = `$${total}`;
                btnPrice.textContent = `Checkout ($${total})`;
            }
        });
    
        del.addEventListener('click', () => {
            cartList.remove();
            total -= parseFloat(product.prdPrice) * number;
            totalPrice.textContent = `$${total}`;
            btnPrice.textContent = `Checkout ($${total})`;
            
            getProduct.splice(prdId, 1);
            itemLength.textContent = getProduct.length;
            
            localStorage.setItem('cart_items', JSON.stringify(getProduct));
        })
    
        parentProduct.append(cartList);
    });
}

let checkOutBtn = document.querySelector('.btnCheck');
let closeForm = document.querySelector('.close-form');
let popForm = document.querySelector('.pop_form');
if (total > 0) {
    checkOutBtn.addEventListener('click', () => {
        popForm.style.display = 'flex'
    })
}

closeForm.addEventListener('click', () => {
    popForm.style.display = 'none'
});

let subBtn = document.getElementById('subForm');
let email = document.getElementById('email');

subBtn.addEventListener("click", payWithPaystack, false);



function payWithPaystack(e) {
  e.preventDefault();

  let handler = PaystackPop.setup({
    key: 'pk_test_2de97faa0210387c237b000be5572ca54df068cc', // Replace with your public key
    email: email.value,
    amount: total * 100,
    ref: (new Date()).getTime().toString(), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);
    }
  });

  handler.openIframe();
}