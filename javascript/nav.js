let burger = document.querySelector('.burger');
let sidemenu = document.querySelector('.sidemenu');

let displayCategories = document.querySelector('.categories');
let listCategory = document.querySelector('.list-categories');

burger.addEventListener('click', () => {
    if (sidemenu.style.bottom == '-100vh') {
        sidemenu.style.transition = 'bottom .7s'
        sidemenu.style.bottom = 0
    }
    else {
        sidemenu.style.bottom = '-100vh'
    }
});

displayCategories.addEventListener('click', () => {
    if (listCategory.style.display == 'none') {
        listCategory.style.display = 'flex'
    }
    else {
        listCategory.style.display = 'none'
    }
})