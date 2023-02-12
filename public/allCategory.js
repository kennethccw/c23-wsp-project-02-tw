//Initially display all products
import { userName, logout, profile, searchBar } from "./forImport.js";
import func from "./func.js";

window.onload = async () => {
  await userName();
  logout();
  profile();
  searchBar();
  await loadAllCategory();
  // import variable from func.js
  console.log(func);
};

async function loadAllCategory() {
  const resp = await fetch("/allCategory");
  const products = await resp.json();
  console.log(products);

  for (const product of products) {
    const url = "http://localhost:8080/product.html?";
    const obj = {
      id: `${product.id}`,
    };
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    let pathOfEachProduct = url + queryString;

    // Create Product Card
    const productCard = document.createElement("div");
    const productId = product.category_id;
    const productStock = product.stock;
    const productSale = product.sales_quantity;
    productCard.classList.add("productCard", `category-${productId}`, productStock);
    productCard.setAttribute("id", productSale);

    // Create Image div
    const imageArea = document.createElement("div");
    imageArea.classList.add("imageArea");

    const productURL = document.createElement("a");
    productURL.classList.add("imageArea");
    productURL.setAttribute("href", pathOfEachProduct);
    productCard.appendChild(productURL);

    const productImage = document.createElement("img");
    productImage.classList.add("productImg");
    productImage.setAttribute("src", product.image);

    productURL.appendChild(productImage);

    // Create Product info. div
    const productInfoArea = document.createElement("div");
    productInfoArea.classList.add("productInfoArea");

    // Create Product name div
    const productName = document.createElement("div");
    productName.classList.add("productName");
    productName.innerText = product.name.toUpperCase();
    productInfoArea.appendChild(productName);

    // Create Product price div
    const productPrice = document.createElement("div");
    productPrice.innerText = "$" + product.price;
    productInfoArea.appendChild(productPrice);
    productCard.appendChild(productInfoArea);

    document.getElementById("products").appendChild(productCard);
  }
}

// Put category value into button
function filterProduct(e, category) {
  let categoryButton = document.querySelectorAll(".button-category");
  let secondButton = document.querySelectorAll(".secondButton-category");
  let showCards = document.querySelectorAll(".productCard");

  // Change color when button is hitted
  category, e.target.classList.add("active");

  // Clear other button color
  categoryButton.forEach((element) => {
    if (element !== e.target) {
      element.classList.remove("active");
    }
  });
  secondButton.forEach((element) => {
    if (element !== e.target) {
      element.classList.remove("active");
    }
  });

  // Show product by hidden control
  showCards.forEach((element) => {
    if (category === "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(category)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

function checkStock(e) {
  let showCards = document.querySelectorAll(".productCard");
  showCards.forEach((element) => {
    if (element.classList.contains("true")) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}

function checkSale(e) {
  let showCards = document.querySelectorAll(".productCard");
  showCards.forEach((element) => {
    if (element.id > 50) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
}

document.querySelector("#all").addEventListener("click", (e) => {
  filterProduct(e, "all");
});

document.querySelector("#drinks").addEventListener("click", (e) => {
  filterProduct(e, "category-1");
});

document.querySelector("#snacks").addEventListener("click", (e) => {
  filterProduct(e, "category-2");
});

document.querySelector("#noodles").addEventListener("click", (e) => {
  filterProduct(e, "category-3");
});

document.querySelector("#stock").addEventListener("click", (e) => {
  filterProduct(e);
  checkStock(e);
});

document.querySelector("#sale").addEventListener("click", (e) => {
  filterProduct(e);
  checkSale(e);
});
