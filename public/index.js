import { userName, logout, profile, searchBar } from "./forImport.js";
let paramsStringObj = { product: "name", origin: "hongkong", price: "25" };
window.onload = async () => {
  await loadProducts();
  await userName();
  logout();
  profile();
  searchBar();
};

async function loadProducts() {
  const resp = await fetch("/index");
  const products = await resp.json();
  console.log(products);

  // Version 1
  let drinkStr = ``;
  let snackStr = ``;
  let noodleStr = ``;
  let drinkCount = 1;
  let snackCount = 1;
  let noodleCount = 1;

  for (const product of products) {
    console.log(product.category_id);
    if (product.category_id === 1) {
      const url = "http://localhost:8080/product.html?";
      const obj = {
        id: `${product.id}`,
      };

      const searchParams = new URLSearchParams(obj);
      // console.log(searchParams);
      const queryString = searchParams.toString();
      // console.log(queryString)
      let pathOfEachProduct = url + queryString;

      drinkStr += `
    <div class="topSalesProducts${drinkCount}">
      <a href="${pathOfEachProduct}"><img class="productsImage" src="${product.image}" alt="..."/></a>
      <div class="productsName">${product.name}</div>
      <div class="productsPrice">$${product.price}</div>
      </div>
      `;

      drinkCount++;
    }

    if (product.category_id === 2) {
      const url = "http://localhost:8080/product.html?";
      const obj = {
        id: `${product.id}`,
      };
      const searchParams = new URLSearchParams(obj);
      const queryString = searchParams.toString();
      let pathOfEachProduct = url + queryString;

      snackStr += `
    <div class="topSalesProducts${snackCount}">
      <a href="${pathOfEachProduct}"><img class="productsImage" src="${product.image}" alt="..."/></a>
      <div class="productsName">${product.name}</div>
      <div class="productsPrice">$${product.price}</div>
      </div>
      `;
      snackCount++;
    }

    if (product.category_id === 3) {
      const url = "http://localhost:8080/product.html?";
      const obj = {
        id: `${product.id}`,
      };
      const searchParams = new URLSearchParams(obj);
      const queryString = searchParams.toString();
      let pathOfEachProduct = url + queryString;
      noodleStr += `
    <div class="topSalesProducts${noodleCount}">
      <a href="${pathOfEachProduct}"><img class="productsImage" src="${product.image}" alt="..."/></a>
      <div class="productsName">${product.name}</div>
      <div class="productsPrice">$${product.price}</div>
      </div>
      `;
      noodleCount++;
    }
  }
  document.querySelector(".topSalesDrinksGroup").innerHTML = drinkStr;
  document.querySelector(".topSalesSnacksGroup").innerHTML = snackStr;
  document.querySelector(".topSalesNoodlesGroup").innerHTML = noodleStr;
}

// async function userName() {
//   const userInfo = await fetch("/login");
//   const userInfoObj = await userInfo.json();
//   const username = userInfoObj.username;
//   const usernameDiv = document.querySelector(".username");
//   usernameDiv.innerText = username;
// }

// function logout() {
//   const logoutButton = document.querySelector(".logoutbutton");
//   logoutButton.addEventListener("click", async (e) => {
//     e.preventDefault();
//     const resp = await fetch("/logout", { method: "GET" });
//     if (resp.status === 200) {
//       alert("You signed out!!");
//       window.location = "/";
//     }
//   });
// }
// function profile() {
//   const profileButton = document.querySelector(".profilebutton");
//   profileButton.addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log("hihi");
//     const resp = await fetch("/profile", { method: "GET" });
//     if (resp.status === 200) {
//       alert("hi");
//       window.location = "/profile.html";
//     }
//   });
// }

// function searchBar() {
//   console.log("hihihi");
//   const searchBarDiv = document.querySelector(".search-bar-input");
//   const searchBarRecommend = document.querySelector(".search-bar-recommend");

//   // searchBarDiv.addEventListener("change", async (e) => {
//   //   const searchBarInput = e.target;
//   //   if (searchBarInput.value === "") {
//   //     searchBarRecommend.setAttribute("hidden", "");
//   //     searchBarRecommend.innerHTML = "";
//   //   }
//   // });

//   console.log("byebyebye");
//   searchBarDiv.addEventListener("input", async (e) => {
//     // e.preventDefault();
//     searchBarRecommend.removeAttribute("hidden");
//     const searchBarInput = e.target;
//     const formBody = { name: searchBarInput.value };
//     console.log(formBody);
//     if (searchBarInput.value === "") {
//       searchBarRecommend.setAttribute("hidden", "");
//       searchBarRecommend.innerHTML = "";
//     } else {
//       const resp = await fetch("/search", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formBody),
//       });
//       console.log("finished fetching");
//       if (resp.status === 200) {
//         searchBarRecommend.innerHTML = "";
//         const data = await resp.json();
//         const recommendDiv = document.querySelector(".search-bar-recommend");
//         let count = 1;
//         for (const item of data) {
//           const { image, name, price } = item;
//           console.log(item);
//           const productContainerDiv = document.createElement("div");
//           productContainerDiv.className = "recommend-product-container";

//           const productImg = document.createElement("img");
//           productImg.className = "recommend-product-img";
//           productImg.setAttribute("src", image);

//           const productNameDiv = document.createElement("div");
//           productNameDiv.className = "recommend-product-name";
//           productNameDiv.innerText = name;

//           const productPriceDiv = document.createElement("div");
//           productPriceDiv.className = "recommend-product-price";
//           productPriceDiv.innerText = `$${price}`;

//           productContainerDiv.appendChild(productImg);
//           productContainerDiv.appendChild(productNameDiv);
//           productContainerDiv.appendChild(productPriceDiv);
//           recommendDiv.appendChild(productContainerDiv);
//           if (count !== data.length) {
//             productContainerDiv.setAttribute("style", "border-bottom: 1px #CCCCCC solid;");
//           }

//           productContainerDiv.addEventListener("click", async (e) => {
//             console.log(productContainerDiv);
//             const formBody = { name };
//             console.log(formBody);
//             const resp = await fetch("/search/product", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(formBody),
//             });
//             if (resp.status === 200) {
//               const data = await resp.json();
//               // alert(data);
//               window.location = `/product.html?id=${data.id}`;
//             }
//           });

//           count++;
//         }
//       } else {
//         searchBarRecommend.innerHTML = "";
//         const textDiv = document.createElement("div");
//         textDiv.innerText = "No Related Products";
//         textDiv.setAttribute("style", "height: 70px;");
//         searchBarRecommend.appendChild(textDiv);
//       }
//     }
//   });

//   const searchBarForm = document.querySelector("#search-bar-form");
//   searchBarDiv.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formBody = form.searchBarInput.value;
//   });
// }
