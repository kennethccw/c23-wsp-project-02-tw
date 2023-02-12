export async function userName() {
  const resp = await fetch("/login");
  if (resp.status === 200) {
    const userInfoObj = await resp.json();
    const username = userInfoObj.username;
    const usernameDiv = document.querySelector(".username");
    usernameDiv.innerText = username;
  }
}

export function logout() {
  const logoutButton = document.querySelector(".logoutbutton");
  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const resp = await fetch("/logout", { method: "GET" });
    if (resp.status === 200) {
      alert("You signed out!!");
      window.location = "/";
    }
  });
}

export function profile() {
  const profileButton = document.querySelector(".profilebutton");
  profileButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("hihi");
    const resp = await fetch("/profile", { method: "GET" });
    if (resp.status === 200) {
      window.location = "/profile.html";
    }
  });
}

export function searchBar() {
  console.log("hihihi");
  const searchBarDiv = document.querySelector(".search-bar-input");
  const searchBarRecommend = document.querySelector(".search-bar-recommend");

  // searchBarDiv.addEventListener("change", async (e) => {
  //   const searchBarInput = e.target;
  //   if (searchBarInput.value === "") {
  //     searchBarRecommend.setAttribute("hidden", "");
  //     searchBarRecommend.innerHTML = "";
  //   }
  // });

  console.log("byebyebye");
  searchBarDiv.addEventListener("input", async (e) => {
    // e.preventDefault();
    searchBarRecommend.removeAttribute("hidden");
    const searchBarInput = e.target;
    const formBody = { name: searchBarInput.value };
    console.log(formBody);
    if (searchBarInput.value === "") {
      searchBarRecommend.setAttribute("hidden", "");
      searchBarRecommend.innerHTML = "";
    } else {
      const resp = await fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      console.log("finished fetching");
      if (resp.status === 200) {
        searchBarRecommend.innerHTML = "";
        const data = await resp.json();
        const recommendDiv = document.querySelector(".search-bar-recommend");
        let count = 1;
        for (const item of data) {
          const { image, name, price } = item;
          console.log(item);
          const productContainerDiv = document.createElement("div");
          productContainerDiv.className = "recommend-product-container";

          const productImg = document.createElement("img");
          productImg.className = "recommend-product-img";
          productImg.setAttribute("src", image);

          const productNameDiv = document.createElement("div");
          productNameDiv.className = "recommend-product-name";
          productNameDiv.innerText = name;

          const productPriceDiv = document.createElement("div");
          productPriceDiv.className = "recommend-product-price";
          productPriceDiv.innerText = `$${price}`;

          productContainerDiv.appendChild(productImg);
          productContainerDiv.appendChild(productNameDiv);
          productContainerDiv.appendChild(productPriceDiv);
          recommendDiv.appendChild(productContainerDiv);
          if (count !== data.length) {
            productContainerDiv.setAttribute("style", "border-bottom: 1px #CCCCCC solid;");
          }

          productContainerDiv.addEventListener("click", async (e) => {
            console.log(productContainerDiv);
            const formBody = { name };
            console.log(formBody);
            const resp = await fetch("/search/product", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formBody),
            });
            if (resp.status === 200) {
              const data = await resp.json();
              // alert(data);
              window.location = `/product.html?id=${data.id}`;
            }
          });

          count++;
        }
      } else {
        searchBarRecommend.innerHTML = "";
        const textDiv = document.createElement("div");
        textDiv.innerText = "No Related Products";
        textDiv.setAttribute("style", "height: 70px; display: flex; align-items: center; margin-left: 14px");
        searchBarRecommend.appendChild(textDiv);
      }
    }
  });

  const searchBarForm = document.querySelector("#search-bar-form");
  searchBarForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formBody = { name: form.searchBarInput.value };
    const resp = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    console.log("finished fetching for search product");
    if (resp.status === 200) {
      window.location = "/searchProduct.html";
    } else {
      alert("Please search again!");
    }
  });
}
