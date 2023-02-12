import { userName, logout, profile, searchBar } from "./forImport.js";

window.onload = async () => {
  loadCartItem();
  displayShoppingCart();
  getId();
  checkBox();
  removeItem();
  await userName();
  logout();
  profile();
  searchBar();
};

///////////////////  to load the data of product to render the shopping cart page first //////////////////

async function displayShoppingCart() {
  const resp = await fetch("/getDataToShoppingCart", {
    method: "GET",
  });

  const data = await resp.json();

  if (resp.status !== 201) {
    alert("something goes wrong on retrieving the product data!");
  } else {
    console.log(data.message);
    let noOfItem = data.totalItems;
    let totalMoney = data.totalAmount;

    document.querySelector("#quantity").innerHTML = noOfItem;
    document.querySelector("#money").innerHTML = totalMoney;

    let containerTemplate = " ";

    for (let datum of data.message) {
      containerTemplate += `
 <div class="container2_1" id="a${datum.product_id}" >
       <div class="leftBox">
         <div class="checkBox"><input type="checkbox" class="smallcheckbox" id="z${datum.product_id}" name="checkbox" value="checkbox"></div>
         <div class="productImage"><img class="image1" src=".${datum.image}"></div>
       </div>
 
       <div class="rightBox">
         <div class="upper">${datum.description}</div>
         <div class="lower">
           <div class="left">
             <div class="currencySign">HKD</div>
             <div class="unitPrice" id="b${datum.product_id}">${datum.total_price_per_product}</div>
           </div>
           <div class="right">
             <div class="minus"><button class="minusButton" " min="1" id="e${datum.product_id}">-</button></div>
             <div class ="unit" id="c${datum.product_id}">${datum.quantity}</div>
             <div class="plus"><button class="plusButton" id="f${datum.product_id}" " max="10">+</i></button></div>
           </div>
         </div>
       </div>  
     </div>
 
 `;

      document.querySelector(".container2").innerHTML = containerTemplate;
    }
  }
}

///////////////////////  quantity control  /////////////////////////////////////////////////

async function getId() {
  document.querySelector(".container2").addEventListener("click", async (e) => {
    console.log(e.target);
    console.log(e.target.id);
    let idValue = e.target.id.slice(1);
    let idValueNumber = idValue;
    console.log(idValueNumber);

    if (e.target.id[0] == "e") {
      let number = parseInt(document.querySelector(`#c${idValueNumber}`).innerHTML);
      // console.log(number);
      if (number > 1) {
        number = number - 1;
        // console.log(number, "from cart.js");

        const formBody = {
          quantity1: number,
          productId: idValueNumber,
        };

        // console.log(formBody)
        const resp = await fetch("/minusQuantity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formBody),
        });

        const data = await resp.json();
        console.log(data.message);
        // console.log()
        document.querySelector(`#b${idValueNumber}`).innerHTML = data.message;
        document.querySelector("#money").innerHTML = data.totalAmount;
        return (document.querySelector(`#c${idValueNumber}`).innerHTML = number.toString());
      }
    }

    if (e.target.id[0] == "f") {
      let number = parseInt(document.querySelector(`#c${idValueNumber}`).innerHTML);

      number = number + 1;
      console.log(number, "from cart.js");
      const formBody = {
        quantity1: number,
        productId: idValueNumber,
      };

      // console.log(formBody)
      const resp = await fetch("/addQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });

      const data = await resp.json();
      console.log(data.message);
      // console.log(typeof data.message)
      document.querySelector(`#b${idValueNumber}`).innerHTML = data.message;
      document.querySelector("#money").innerHTML = data.totalAmount;
      return (document.querySelector(`#c${idValueNumber}`).innerHTML = number.toString());
      // return (document.querySelector(`#c${idValueNumber}`).innerHTML = number.toString());
    }
  });
}

/////////////////////////////////  login / out function //////////////////////
// async function userName() {
//   const userInfo = await fetch("/login");
//   const userInfoObj = await userInfo.json();
//   console.log(userInfo, "cart.js line 147")
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

/////////////////////////////// select product(s) from shopping cart  ///////////////////////////////

async function checkBox() {
  document.querySelector("#checkAll").addEventListener("click", (e) => {
    if (document.querySelector("#checkAll").checked == true) {
      let checkBox = document.querySelectorAll(".smallcheckbox");

      for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].type == "checkbox") {
          checkBox[i].checked = true;
        }
      }
    }

    if (document.querySelector("#checkAll").checked == false) {
      let checkBox = document.querySelectorAll(".smallcheckbox");

      for (let i = 0; i < checkBox.length; i++) {
        if (checkBox[i].type == "checkbox") {
          checkBox[i].checked = false;
        }
      }
    }
  });
}

///////////////// remove some items from the shopping cart  ////////////////////

async function removeItem() {
  document.querySelector("#confirmation").addEventListener("click", async (e) => {
    console.log(e.currentTarget);
    let checkboxes = document.querySelectorAll(".smallcheckbox");
    let divOfProduct = document.querySelectorAll(".container2_1");
    // console.log(checkboxes)
    // console.log(divOfProduct);
    for (let checkbox of checkboxes) {
      let idValue = checkbox.id.slice(1);
      console.log(checkbox);
      console.log(idValue);
      if (document.querySelector(`#z${idValue}`).checked == true) {
        document.querySelector(`#a${idValue}`).classList.add("remove");

        const formBody = { productId: idValue };
        const resp = await fetch("/removeProductRecord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formBody),
        });

        const data = await resp.json();
        if (resp.status !== 201) {
          alert("Sorry, please refresh the browser and do it again");
        } else {
          console.log(" successful removal of items");

          document.querySelector("#money").innerHTML = data.totalPrice;
          document.querySelector("#quantity").innerHTML = data.numberOfItem;
          setTimeout(function () {
            window.location.reload();
          }, 250);
        }
      }
    }
  });
}

// ------------------------------ Pay Button -------------------------------
async function loadCartItem() {
  // const result = await fetch("/create-checkout-session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({test:1})})
  // const url = await result.json()
  // console.log("check url", url)
  // window.location = url

  // let itemList = cartItemList;
  document.querySelector(".checkout-button").addEventListener("click", async (e) => {
    e.preventDefault();

    const result = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ test: 1 }),
    });

    const url = await result.json();
    console.log("check url", url);
    window.location = url;
  });
}
