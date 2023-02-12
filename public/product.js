// import { json } from "stream/consumers";

// import { URLSearchParams } from "url";
// import { userName } from "./fetchUser.js";
import { userName, logout, profile, searchBar } from "./forImport.js";
window.onload = async () => {
  logout();
  // renderProduct();
  await userName();
  profile();
  searchBar();
  submitComment();
  await getImage();
  await productSession();
};

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

///////////////////////  show certain product on the display box   /////////////////////////

async function getImage() {
  let url = window.location.search;
  let queries = new URLSearchParams(url);

  let idOfProduct = queries.get("id");
  // console.log(idOfProduct)
  let formBody = {
    id: idOfProduct,
    // category:categoryOfProduct
  };
  // formBody["category"]=categoryOfProduct;
  // console.log(formBody)

  const resp = await fetch("/id1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formBody),
  });

  const data = await resp.json();
  // console.log(data);

  let id = data[0].id;
  let productName = data[0].name;
  let imageLocation = data[0].image;
  let imageName = data[0].name;
  let pricePerUnit = data[0].price;
  let stockNumber = data[0].stock;
  let salesQuantity = data[0].sales_quantity;
  let d = data[0].description;

  let img1 = `<img src="${imageLocation}" alt="${imageName}" id="${id}" class="displaying">`;
  let price1 = `${pricePerUnit}`;
  let pname = `${productName}`;
  let stNumber = `${stockNumber}`;
  let salesQ = `${salesQuantity}`;
  let descrip = `${d}`;

  document.querySelector("#productName").innerHTML = pname;
  document.querySelector("#productImage").innerHTML = img1;
  document.querySelector("#pricePerGoods").innerHTML = price1;
  document.querySelector("#stockNumber").innerHTML = stNumber;
  document.querySelector("#salesNumber").innerHTML = salesQ;
  document.querySelector("#details").innerHTML = descrip;
}

///////////////////// help save the req.session of the single product on the product page  ////////////////////////////////////////////////////

async function productSession() {
  let url = window.location.search;
  // console.log(url, "haha");
  let queries = new URLSearchParams(url);
  let idOfProduct = queries.get("id");
  // console.log(idOfProduct, "bitch");

  // const formBody={};
  let formBody = {
    id: idOfProduct,
  };
  // formBody["category"]=categoryOfProduct;
  console.log(formBody);

  const resp = await fetch("/productsesseion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formBody),
  });

  const data = await resp.json();
  // console.log(data.id); //workable

  if (resp.status !== 201) {
    console.log("session is not stored successfully");
  } else {
    console.log("session is stored successfully");
  }
}

///////////////////////  quantity control  /////////////////////////////////////////////////

let number = parseInt(document.querySelector("#number").innerHTML);
document.querySelector("#minusButton").addEventListener("click", (e) => {
  console.log(e.currentTarget);
  if (number > 1) {
    number = number - 1;
    // console.log(number);
    return (document.querySelector("#number").innerHTML = number.toString());
  }
});

document.querySelector("#plusButton").addEventListener("click", (e) => {
  // console.log(e.currentTarget);
  number = number + 1;
  // console.log(number);
  return (document.querySelector("#number").innerHTML = number.toString());
});

// //////////////////////// Buy now  ///////////////////////////////////////////////////////
// document.querySelector(".buyNow").addEventListener("click", async () => {
//   {
//     console.log("buy");
//   }
//   const resp = await fetch("/buyNow", {
//     method: "GET",
//   });

//   const data = await resp.json();

//   if (resp.status !== 201) {
//     alert(data.message);
//     window.location = "/login.html";
//   }
//   if (resp.status === 201) {
//     alert(data.message);
//     window.location = "/payment.html";
//   }
// });

//////////////////////  Add to car  ////////////////////////////////////

document.querySelector(".addToCar").addEventListener("click", async () =>
  // {console.log("add to car")
  {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
    let url = window.location.search;
    // console.log(url, "haha");
    let queries = new URLSearchParams(url);
    let idOfProduct = queries.get("id");
    console.log(idOfProduct);

    // let created_date = new Date().toLocaleDateString();
    let created_date = new Date();
    console.log(created_date);

    let quantity1 = document.querySelector("#number").innerHTML;
    console.log(quantity1);

    let formBody = { createdDate: created_date, quantity: quantity1, product_Id: idOfProduct };
    // console.log(formBody)
    const resp = await fetch("/addToCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });

    const data = await resp.json();
    console.log(data);
    if (data) {
      if (resp.status === 201) {
        setTimeout(function () {
          alert(data.message);
        }, 250);
        // alert(data.message);

        setTimeout(function () {
          window.location.reload();
        }, 250);
      }
      if (resp.status !== 201) {
        alert(data.message);
        window.location = "/login.html";
      }
    }
  }
);

///////////////////// subtmit comment  ////////////////////
function submitComment() {
  document.querySelector("#contact-form3").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(e.target);
    const formBody = {};
    const customerComment = form.comment.value;
    // console.log(customerComment);
    formBody["comment"] = customerComment;
    // console.log(formBody)

    const reps = await fetch("/submitComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
  });
}

/////////////////////////  show user name  //////////////////////
// async function userName() {
//   const userInfo = await fetch("/login");
//   const userInfoObj = await userInfo.json();
//   const username = userInfoObj.username;
//   const usernameDiv = document.querySelector(".username");
//   usernameDiv.innerText = username;
// }

/* Kenneth's Work */
// async function renderProduct() {
//   console.log("hi");
//   const resp = await fetch("/search");
//   if (resp.status === 200) {
//     const data = await resp.json();
//     window.location = `/product.html?id=${data.id}`;
//   }

// const productNameDiv = document.querySelector("#productName");
// productNameDiv.innerText = data.name;
// const productImgDiv = document.querySelector("#productImage");
// const productImg = document.createElement("img");
// productImg.setAttribute("src", data.image);
// productImg.setAttribute("alt", data.name);
// productImg.setAttribute("id", data.id);
// productImg.className = "displaying";
// productImgDiv.appendChild(productImg);
// const productPriceDiv = document.querySelector("#pricePerGoods");
// productPriceDiv.innerText = data.price;
// const productStockDiv = document.querySelector("#stockNumber");
// productStockDiv.innerText = data.stock;
// const productSalesDiv = document.querySelector("#salesNumber");
// productSalesDiv.innerText = data.quantity;
// const productDetailDiv = document.querySelector("#details");
// productDetailDiv.innerText = data.description;
// }
/* Kenneth's Work */
