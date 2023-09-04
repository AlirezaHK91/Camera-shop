// ...........###############............Function to toggle the menu visibility on small screens............###############..............

// get the menu items element
let menuitems = document.getElementById("menuitems");
    menuitems.style.maxHeight = "0px";

    function menuToggle() {
      // check if the menu is currently hidden
        if(menuitems.style.maxHeight == "0px") {
      // if hidden, show the menu by setting max height to 200px
        menuitems.style.maxHeight = "200px";
        } else {
      // if visible, hide the menu by setting max height to 0px
        menuitems.style.maxHeight = "0px";
        }
    }  


// ..........###############............Function to move login and registration form horizontally...............###############...........

let SigninForm = document.getElementById("SigninForm");
let RegisterForm = document.getElementById("RegisterForm");
let Indicator = document.getElementById("Indicator");

// Function named "register".......................
function register() {
// set the CSS transform property of RegisterForm to move it horizontally by 0px 
RegisterForm.style.transform = "translateX(0px)";
// set the CSS transform property of SigninForm to move it horizontally by 0px 
SigninForm.style.transform = "translateX(0px)";
// set the CSS transform property of Indicator to move it horizontally by 100px
Indicator.style.transform = "translateX(100px)";
}

// Function named "signin"..........................
function signin() {
// set the CSS transform property of RegisterForm to move it horizontally by 300px to the right
RegisterForm.style.transform = "translateX(300px)";
// set the CSS transform property of SigninForm to move it horizontally by 300px to the right
SigninForm.style.transform = "translateX(300px)";
// set the CSS transform property of Indicator to move it horizontally by 0px 
Indicator.style.transform = "translateX(0px)";
}


// ...............###############..................Shopping cart function.................###############....................


// retrieve the local data or create an empty object for cart list
const cart = JSON.parse(localStorage.getItem("data"));
const cartElement = document.getElementById('cart');
getFromLocalStorage();

// Function  for adding product to the cart
function addToCart(productName, price) {
  // check if the product is already in the cart
  if (cart.hasOwnProperty(productName)) {
    // if the item is already in the cart, increase the quantity
    alert("The item already exists in the cart!")
  } else {
    // if not, add quantity 1 and price to the product object
    cart[productName] = { quantity: 1, price: price };
  }
  //save the data to local storage to be able to retrieve the local data after refreshing the page
  addToLocalStorage(cart);
  // update the cart display
  updateCartItems();
}

// Function to increase product quantity from cart.................................
function increaseQuantity(productName) {
  // increase the quantity
  cart[productName].quantity++;
  //save the data to local storage to be able to retrieve the data after refreshing the page
  addToLocalStorage(cart);
  // update the cart display
  updateCartItems();
}

// Function to decrease product quantity from cart.................................
function decreaseQuantity(productName) {
  // check if the quantity is greater than 1
  if (cart[productName].quantity > 1) {
    // if yes, decrease the quantity
    cart[productName].quantity--;
    //save the data to local storage to be able to retrieve the data after refreshing the page
    addToLocalStorage(cart);
    // update the cart display
    updateCartItems();
  }
}

// Function to delete products from the cart......................................
function removeProduct(productName) {
  // delete the product from the cart
  delete cart[productName];
  //save the data to local storage to be able to retrieve the data after refreshing the page
  addToLocalStorage(cart);
  // update the cart display
  updateCartItems();
}

// Function to update the cart display................................

function updateCartItems() {
  // clear the cart display
  cartElement.innerHTML = '';

  // initialize total items and total price
  let totalItems = 0;
  let totalPrice = 0;

  // iterate through each product in the cart
  for (const product in cart) {
    const item = cart[product];
    const itemTotalPrice = item.quantity * item.price;

    // create a cart item container
    const cartItem = document.createElement('div');
    // add class to the div
    cartItem.classList.add('cart-item');

    // add the product details and buttons to the cart item container
    cartItem.innerHTML = `
      <span>${product}</span>
      <span>Price: $${item.price}</span>
      <button class="decrease-btn">-</button>
      <span>${item.quantity}</span>
      <button class="increase-btn">+</button>
      <button class="remove-btn">Remove</button>
      <span>Total: $${itemTotalPrice}</span>
    `;

    const decreaseBtn = cartItem.querySelector('.decrease-btn');
    const increaseBtn = cartItem.querySelector('.increase-btn');
    const removeBtn = cartItem.querySelector('.remove-btn');
    
    // add event listeners for buttons to do these three functions
    decreaseBtn.addEventListener('click', () => decreaseQuantity(product));
    increaseBtn.addEventListener('click', () => increaseQuantity(product));
    removeBtn.addEventListener('click', () => removeProduct(product));
    
    // append the cart item container to the cart display
    cartElement.appendChild(cartItem);

    // update total items and total price
    totalItems += item.quantity;
    totalPrice += itemTotalPrice;
  }

  // display the cart total if there are items in the cart and checkout button to proceed with the purchase
  if (totalItems > 0) {
    // create a cart total container
    const cartTotal = document.createElement('div');
    // add class to the div
    cartTotal.classList.add('cart-total');

    //add total item, total price and checkout button to the cart total container
    cartTotal.innerHTML = `
      <p>Total Items: ${totalItems}</p>
      <p>Total Price: $${totalPrice}</p>
      <div class="checkout">
        <a href="signin.html"><button class="checkout-cursor">Checkout</button></a>
      </div>
    `;

    // append the cart total container to the cart display
    cartElement.appendChild(cartTotal);
  }
}

//Function to add data to local storage 
function addToLocalStorage (cart) {
  localStorage.setItem("data", JSON.stringify(cart));
  updateCartItems();
}

//Function to retrieve data from the local storage
function getFromLocalStorage() {
  JSON.parse(localStorage.getItem("data"));
  updateCartItems();
}

// ...............###############..................Sign in and register function.................###############....................

//No function yet
