console.log("connected");
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
      .then((res) => res.json()) 
      .then((json) => displayCategory(json.categories));
  };

  const displayCategory = (categories) => {
    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";
  
    categories.forEach(category=> {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                   <button id="category-btn-${category.id}"  class="category-btn w-full text-left">
                     ${category.category_name}
                    </button>
      `;
  
    
  
      categoryContainer.append(btnDiv);
    });
  };
  
  loadCategories();