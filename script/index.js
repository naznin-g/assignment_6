const manageSpinner = (status) => {
 if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
   document.getElementById("plant-container").classList.add("hidden");
 } else {
    document.getElementById("plant-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};


const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategory(json.categories));
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadCategoryPlant = (id, categoryName, btn) => {
  removeActive();
  btn.classList.add("active");

  manageSpinner(true); // show spinner + hide plants

  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status && data.plants) {
        displayCategoryPlant(data.plants);
      } else {
        displayCategoryPlant([]);
      }
    })
    .catch((err) => console.error("Error fetching plants:", err))
    .finally(() => {
      manageSpinner(false); 
    });
  };
 const loadPlantDescription=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/plant/${id}`;
  
  const res=await fetch(url);
  const description=await res.json();
  displayPlantDescription(description.plants);
};
const displayPlantDescription=(plant)=>{
  console.log(plant);
  const descriptionBox=document.getElementById("description-container");
  descriptionBox.innerHTML=`
  <div>
    <h3  class="text-xl font-semibold mb-1 cursor-pointer text-green-500">${plant.name}</h3>
      <p class="text-gray-600 mb-2">${plant.description}</p>
      
      <button class="font-bold text-green-600 mb-2 p-2 rounded-xl bg-green-200">${plant.category}</button></div>`;
  document.getElementById("plants_modal").showModal();

};

const displayCategoryPlant = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  if (!plants || plants.length === 0) {
    plantContainer.innerHTML = `
      <div class="text-center col-span-full rounded-xl py-10 space-y-6">
        <p>No plants found for this category.</p>
      </div>
    `;
    return;
  }

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className = "border rounded p-4 bg-white shadow";

    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-40 object-cover rounded mb-3">
      <h3 onclick="loadPlantDescription(${plant.id})" class="plant-name text-xl font-semibold mb-1 cursor-pointer hover:underline plant-name" >${plant.name}</h3>
      <p class="text-gray-600 mb-2">${plant.description.slice(0, 70)}...</p>
      <div class="flex justify-between">
      <button class="font-bold text-green-600 mb-2 p-2 rounded-xl bg-green-200">${plant.category}</button>
      <p class="plant-price font-bold text-green-600 p-2 mb-2 ">Price:৳${plant.price}</p></div>
      <button class="cart-btn btn btn-success w-full text-white">Add to Cart</button>
    `;

    const btn = card.querySelector(".cart-btn");
    btn.addEventListener("click", () => {
      const name = card.querySelector(".plant-name").textContent;
      const priceText = card.querySelector(".plant-price").textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

      addToCart({ name, price });
      openCart();
    });


    plantContainer.appendChild(card);
  });
};

// Display category buttons
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  categories.forEach((category) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button
        id="category-btn-${category.id}"
        class="category-btn w-full text-left py-2 px-3 border rounded"
        onclick="loadCategoryPlant(${category.id}, '${category.category_name}', this)"
      >
        ${category.category_name}
      </button>
    `;
    categoryContainer.appendChild(btnDiv);
  });
};

loadCategories();
 

let cart = [];

const addToCart = (plant) => {
  
  const existing = cart.find(item => item.name === plant.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...plant, quantity: 1 });
  }

  renderCart();

  // Show the cart section
  document.getElementById("cart-section").classList.remove("hidden");
};

// Render cart items
const renderCart = () => {
  const cartContainer = document.getElementById("cart-container");
  const totalPriceEl = document.getElementById("total-price");
  const totalQuantityEl = document.getElementById("total-quantity");

  cartContainer.innerHTML = "";
  let totalPrice = 0;
  let totalQuantity = 0;

  cart.forEach((item, index) => {
    const itemTotal=item.price*item.quantity;
    totalPrice += itemTotal;
    totalQuantity += item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "flex justify-between items-center border-b py-2";

    cartItem.innerHTML = `
      <div class="flex flex-col">
      <div class="font-semibold">${item.name}</div>
        <div>
        ${item.quantity}x৳${item.price}=৳${item.price*item.quantity}
        </div>
        </div>

      <button class="remove text-red-600 hover:underline">x</button>
    `;

    cartItem.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });

    cartContainer.appendChild(cartItem);
  });

  totalPriceEl.textContent = totalPrice;
  totalQuantityEl.textContent = totalQuantity;
};
  function openCart() {
    document.getElementById("cart-section").classList.remove("translate-x-full");
  }
  
  function closeCart() {
    document.getElementById("cart-section").classList.add("translate-x-full");
  }
  
  document.getElementById("close-cart").addEventListener("click", closeCart);
  

