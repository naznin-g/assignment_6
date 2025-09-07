
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
  btn.classList.add("active"); // mark clicked button active

  const url = `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.status && data.plants) {
        displayCategoryPlant(data.plants); // show filtered plants
      } else {
        displayCategoryPlant([]); // fallback if no plants
      }
    })
    .catch((err) => console.error("Error fetching plants:", err));
};


// Display plant cards
const displayCategoryPlant = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  if (!plants || plants.length === 0) {
    plantContainer.innerHTML = `
      <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
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
      <h3 class="text-xl font-semibold mb-1 cursor-pointer text-blue-600 hover:underline">${plant.name}</h3>
      <p class="text-gray-600 mb-2">${plant.description.slice(0, 80)}...</p>
      <p class="font-bold text-green-600 mb-2">Price: $${plant.price}</p>
      <button class="btn btn-success w-full">Add to Cart</button>
    `;
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
        class="category-btn w-full text-left py-2 px-3 border rounded hover:bg-green-100 transition"
        onclick="loadCategoryPlant(${category.id}, '${category.category_name}', this)"
      >
        ${category.category_name}
      </button>
    `;
    categoryContainer.appendChild(btnDiv);
  });
};

loadCategories();


//