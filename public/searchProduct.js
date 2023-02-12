import { userName, logout, profile, searchBar } from "./forImport.js";

window.onload = async () => {
  await userName();
  logout();
  profile();
  searchBar();
  await loadSearchPage();
};

async function loadSearchPage() {
  const resp = await fetch("/search");
  const data = await resp.json();
  console.log(data);
  const searchQuery = data.query;
  const productArr = data.productArr;
  const headerDiv = document.querySelector(".header-container");
  const headerLeftDiv = document.createElement("div");
  headerLeftDiv.className = "header-left-container";
  headerLeftDiv.innerText = `Result of searching "${searchQuery}"`;

  const headerRightDiv = document.createElement("div");
  headerRightDiv.className = "header-right-container";
  const amountFoundDiv = document.createElement("div");
  amountFoundDiv.className = "amount-result";
  amountFoundDiv.innerText = `${productArr.length} Results Found`;

  const sortingSelect = document.createElement("select");
  const ascendingAlphabets = document.createElement("option");
  ascendingAlphabets.setAttribute("value", "Sorted by A-Z");
  ascendingAlphabets.innerText = "Sorted by A-Z";

  const descendingAlphabets = document.createElement("option");
  descendingAlphabets.setAttribute("value", "Sorted by Z-A");
  descendingAlphabets.innerText = "Sorted by Z-A";

  const ascendingPrice = document.createElement("option");
  ascendingPrice.setAttribute("value", "Sorted by $-$$$");
  ascendingPrice.innerText = "Sorted by $-$$$";

  const descendingPrice = document.createElement("option");
  descendingPrice.setAttribute("value", "Sorted by $$$-$");
  descendingPrice.innerText = "Sorted by $$$-$";

  sortingSelect.appendChild(ascendingAlphabets);
  sortingSelect.appendChild(descendingAlphabets);
  sortingSelect.appendChild(ascendingPrice);
  sortingSelect.appendChild(descendingPrice);

  sortingSelect.addEventListener("change", async (e) => {
    const selectedSorting = e.target.value;
    console.log(selectedSorting);
    const contentContainer = document.querySelector(".content-container");
    switch (selectedSorting) {
      case "Sorted by A-Z":
        contentContainer.innerHTML = "";
        // const ascAlphabetProductResp = await fetch("/sort/alphabet/ascending");
        const ascAlphabetProductResp = await fetch("/sort/?alphabet=asc");
        const ascAlphabetProduct = await ascAlphabetProductResp.json();
        createAllDiv(ascAlphabetProduct);
        break;
      case "Sorted by Z-A":
        contentContainer.innerHTML = "";
        // const descAlphabetProductResp = await fetch("/sort/alphabet/descending");
        const descAlphabetProductResp = await fetch("/sort/?alphabet=desc");
        const descAlphabetProduct = await descAlphabetProductResp.json();
        createAllDiv(descAlphabetProduct);
        break;
      case "Sorted by $-$$$":
        contentContainer.innerHTML = "";
        // const ascPriceProductResp = await fetch("/sort/price/ascending");
        const ascPriceProductResp = await fetch("/sort/?price=asc");
        const ascPriceProduct = await ascPriceProductResp.json();
        createAllDiv(ascPriceProduct);
        break;
      case "Sorted by $$$-$":
        contentContainer.innerHTML = "";
        // const descPriceProductResp = await fetch("/sort/price/descending");
        const descPriceProductResp = await fetch("/sort/?price=desc");
        const descPriceProduct = await descPriceProductResp.json();
        createAllDiv(descPriceProduct);
        break;
    }
  });

  headerRightDiv.appendChild(amountFoundDiv);
  headerRightDiv.appendChild(sortingSelect);

  headerDiv.appendChild(headerLeftDiv);
  headerDiv.appendChild(headerRightDiv);
  createAllDiv(productArr);
}

function createAllDiv(productArr) {
  let count = 1;
  for (const product of productArr) {
    const contentContainer = document.querySelector(".content-container");
    const productDiv = document.createElement("div");
    productDiv.className = "product-container";

    const imgDiv = document.createElement("img");
    imgDiv.className = "image-container";
    imgDiv.setAttribute("src", product.image);
    const nameDescriptionDiv = document.createElement("div");
    nameDescriptionDiv.className = "name-description-container";
    const nameDiv = document.createElement("div");
    nameDiv.className = "name-container";
    nameDiv.innerText = product.name;
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description-container";
    descriptionDiv.innerText = product.description;
    nameDescriptionDiv.appendChild(nameDiv);
    nameDescriptionDiv.appendChild(descriptionDiv);
    const priceDiv = document.createElement("div");
    priceDiv.className = "price-container";
    priceDiv.innerText = `$${product.price}.00`;
    productDiv.appendChild(imgDiv);
    productDiv.appendChild(nameDescriptionDiv);
    productDiv.appendChild(priceDiv);
    contentContainer.appendChild(productDiv);

    productDiv.addEventListener("click", async (e) => {
      // console.log(productContainerDiv);
      const formBody = { name: product.name };
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

    if (count !== productArr.length) {
      productDiv.setAttribute("style", "border-bottom: 1px solid #CCCCCC");
    }
    count++;
  }
}
