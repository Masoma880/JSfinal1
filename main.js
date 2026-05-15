 let products = [

  {
    name: "Weeding Dress",
    price: 1500,
    image: "Dress.jpeg",
    description: "Made for your unforgeetable day"
  },

  {
    name: "Weeding Dress",
    price: 2000,
    image: "Dress1.jpeg",
    description: "made for your unforgeetable day."
  },

  {
    name: "Weeding Dress",
    price: 1800,
    image: "Dress2.jpeg",
    description: "Made for Your Unforgeetable Day."
  },

  {
    name: "Weeding Dress", 
    price: 1500,
    image: "Dress3.jpeg",
    description: "made for your unforgeetable day."
    
  },

  {
    name: "Weeding Dress",
    price: 1700,
    image: "Dress4.jpeg",
    description: "Made for Your Unforgeetable day."
  },

  {
    name: "Weeding Dress",
    price:1900,
    image: "Dress5.jpeg",
    description: "made for your unforgeetable day."
  },

  {
    name: "Elegant Fan",
    price: 110,
    image: "Elegant Fan.jpeg",
    description: "Elegant bridal Fan"
  },

  {
    name: "Elegant Fan",
    price: 160,
    image: "Elegant Fan1.jpeg",
    description: "Elegant bridal Fan"
  },

  {
    name: "Elegant Fan",
    price: 140,
    image: "Elegant Fan2.jpeg",
    description: "Elegant  bridal Fan "
  },

  {
    name: "WhiteBouquet",
    price: 200,
    image: "Bouquet1.jpeg",
    description: "Romantic bridal flowers"
  },

  {
    name: "Red Bouquet",
    price: 200,
    image: "Bouquet.jpeg",
    description: "Elegant engagement ring"
  },

  {
    name: "Accessory",
    price: 600,
    image: "Queen.jpeg",
    description: "Luxury bridal accessory"
  },

  {
    name: "Accessory",
    price: 95,
    image: "Queen1.jpeg",
    description: "Laxury bridal accesory"
  },
 
  {
    name: "Pearl Heels",
    price: 1700,
    image: "shoes1.jpeg",
    description: "Elegant bridal shoes"
  },

  {
    name: "Pearl Heels",
    price: 1500,
    image: "shoes3.jpeg",
    description: "Elegant bridal shoes"
  },
  {
    name: "Pearl Heels",
    price: 1200,
    image: "shoes4.jpeg",
    description: "Elegant bridal shoes"
  },
  {
    name: "Pearl Heels",
    price: 1700,
    image: "shoes5.jpeg",
    description: "Elegant bridal shoes"
  },
  


];



let cart = JSON.parse(localStorage.getItem("cart")) || [];
function calculateTotal(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

let productContainer = document.getElementById("product-list");

if(productContainer){
  displayProducts(products);
}
function displayProducts(productArray){

  productContainer.innerHTML = "";



  productArray.forEach((product) => {

    productContainer.innerHTML += `

      <div class="card">

        <img src="${product.image}">

        <h2>${product.name}</h2>

        <p>${product.description}</p>

        <h3>$${product.price}</h3>

        <button class="cart-btn"
        data-name="${product.name}"
        data-price="${product.price}">
  Add to Cart
</button>

      </div>

    `;

  });

  document.querySelectorAll(".cart-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    addToCart(
      this.dataset.name,
      parseFloat(this.dataset.price)
    );
  });
});

}






function addToCart(name, price){

  let existingItem = cart.find(item => item.name === name);

  if(existingItem){
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
}





function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let totalPrice = document.getElementById("total-price");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="cart-card">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>

        <button onclick="increaseQuantity(${index})">
          <i class="fa-solid fa-plus"></i>
        </button>

        <button onclick="decreaseQuantity(${index})">
          <i class="fa-solid fa-minus"></i>
        </button>

        <button onclick="removeItem(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });

  let total = calculateTotal(cart);
  totalPrice.innerText = "Total: $" + total;
}




function removeItem(index){

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  displayCart();

}




function increaseQuantity(index){

  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();

}




function decreaseQuantity(index){

  if(cart[index].quantity > 1){

    cart[index].quantity--;

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();

}




function updateCartCount(){

  let cartCount = document.getElementById("cart-count");

  if(cartCount){

    let totalItems = cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    cartCount.innerText = totalItems;
  }
}




function searchProducts(){

  let input = document.getElementById("search-input").value.toLowerCase();



  let filteredProducts = products.filter(product =>

    product.name.toLowerCase().includes(input)

  );



  displayProducts(filteredProducts);

}



if (document.getElementById("cart-items")) {
  displayCart();
}

if (document.getElementById("cart-count")) {
  updateCartCount();
}