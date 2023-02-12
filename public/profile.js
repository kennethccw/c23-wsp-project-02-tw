console.log("hi");

import { userName, logout, profile, searchBar } from "./forImport.js";
window.onload = async () => {
  await userName();
  logout();
  profile();
  searchBar();
  await createProfile();
  editProfile();
  changePassword();
  switchPage();
};

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

async function createProfile() {
  const resp = await fetch("/profile");
  const data = await resp.json();
  const user = data[0];
  console.log(user);
  console.log(user.username, user.email, user.mobile, user.birthday, user.subscription);
  const leftContainer = document.querySelector(".left-container");
  for (const key in user) {
    const containerForAll = document.querySelector(".profile-content-container");
    // const listNodeContainer = document.querySelector(".listnode-container");
    // const contentContainer = document.querySelector(".content-container");
    const listNode = document.createElement("div");
    const content = document.createElement("div");
    listNode.className = `${key}-listnode`;
    if (key === "email") {
      listNode.innerText = `${key[0].toUpperCase() + key.slice(1)} (Unchangeable): `;
    } else {
      listNode.innerText = `${key[0].toUpperCase() + key.slice(1)}: `;
      content.setAttribute("contenteditable", "true");
      content.classList.add("input-content");
    }
    content.classList.add(`${key}-content`, "profile-content");
    if (key === "birthday") {
      const birthday = new Date(user[key]).toLocaleDateString();
      const newBirthdayArr = birthday.split("/");
      const newBirthday = newBirthdayArr[2] + "-" + newBirthdayArr[1] + "-" + newBirthdayArr[0];
      content.innerText = newBirthday;
      // const birthday = user[key].split("T");
      // const newDate = birthday[0];
      // const lastDigit = parseInt(newDate[newDate.length - 1]) + 1;
      // content.innerText = newDate.slice(0, -1) + lastDigit;
      console.log("hihihi");
    } else {
      content.innerText = user[key];
    }
    // if (key !== "email") {
    //   content.setAttribute("contenteditable", "true");
    //   content.classList.add("input-content");
    // }
    if (key === "subscription") {
      user[key] ? (content.innerText = "Yes") : (content.innerText = "No");
    }
    const listnodeContentContainer = document.querySelector(".listnode-content-container");
    listnodeContentContainer.appendChild(listNode);
    listnodeContentContainer.appendChild(content);
    // listnodeContentContainer.className = "listnode-content-container";
    // listnodeContentContainer.appendChild(listNodeContainer);
    // listnodeContentContainer.appendChild(contentContainer);
    leftContainer.appendChild(listnodeContentContainer);
    containerForAll.appendChild(leftContainer);
  }
  const submitButton = document.createElement("button");
  submitButton.classList.add("left-container-button", "add-color");
  submitButton.setAttribute("type", "submit");
  const subimitButtonContainer = document.createElement("div");
  subimitButtonContainer.className = "left-submit-container";
  submitButton.innerText = "Submit";
  subimitButtonContainer.appendChild(submitButton);
  leftContainer.appendChild(subimitButtonContainer);
}

function editProfile() {
  const leftContainerSubmitButton = document.querySelector(".left-container-button");
  leftContainerSubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const usernameDiv = document.querySelector(".username-content");
    const mobileDiv = document.querySelector(".mobile-content");
    const birthdayDiv = document.querySelector(".birthday-content");
    const subscriptionDiv = document.querySelector(".subscription-content");
    let subscriptionBoolean;
    if (subscriptionDiv.innerText !== "No") {
      console.log("true 1");
    } else if (subscriptionDiv.innerText !== "Yes") {
      console.log("false 1");
    }

    console.log(birthdayDiv.innerText);
    console.log(new Date(birthdayDiv.innerText));
    console.log(!isNaN(new Date(birthdayDiv.innerText).getTime()));
    if (subscriptionDiv.innerText === "Yes") {
      console.log("true 2");
    } else if (subscriptionDiv.innerText === "No") {
      console.log("false 2");
    }
    // console.log("check birthday", birthdayDiv.innerHTML);
    if (usernameDiv.innerText.length >= 20 || usernameDiv.innerText.includes(" ")) {
      alert("Invalid Username!");
      return;
    }
    if (isNaN(parseInt(mobileDiv.innerText)) || mobileDiv.innerText.length !== 8) {
      alert("Invalid Mobile number!");
      return;
    }
    if (isNaN(new Date(birthdayDiv.innerText).getTime()) || birthdayDiv.innerText.length < 8) {
      alert("Invalid birthday number!");
      return;
    }
    if (subscriptionDiv.innerText !== "Yes" && subscriptionDiv.innerText !== "No") {
      alert('Type "Yes" / "No" on subscribing to our latest news.');
      return;
    }
    if (subscriptionDiv.innerText === "Yes") {
      subscriptionBoolean = true;
      console.log("turned into true");
    } else {
      subscriptionBoolean = false;
      console.log("turned into false");
    }
    console.log(subscriptionBoolean);
    const formBody = { username: usernameDiv.textContent, mobile: parseInt(mobileDiv.innerText), birthday: birthdayDiv.textContent, subscription: subscriptionBoolean };
    const resp = await fetch("/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    if (resp.status === 200) {
      window.location = "/profile.html";
      alert("edited profile");
    } else {
      window.location = "/";
    }
  });
}

function changePassword() {
  const passwordForm = document.querySelector("#passwordform");
  passwordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.password.value === form.confirmPassword.value) {
      const formBody = { password: form.password.value };
      const resp = await fetch("/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formBody),
      });
      if (resp.status === 200) {
        window.location = "/profile.html";
        alert("edited password");
      } else {
        window.location = "/";
      }
    } else {
      alert("Inputs do not match!");
    }
  });
}

function switchPage() {
  const switchPageButtons = document.querySelectorAll(".switcher");
  switchPageButtons.forEach((element) => {
    element.addEventListener("click", async (e) => {
      const leftContainer = document.querySelector(".left-container");
      const passwordContainer = document.querySelector("#passwordform");
      const profileSwitcher = document.querySelector(".profile-switcher");
      const passwordSwitcher = document.querySelector(".password-switcher");
      if (element.innerText === "Edit Profile") {
        leftContainer.removeAttribute("hidden", "");
        passwordContainer.setAttribute("hidden", "");
        passwordSwitcher.classList.remove("add-color");
        profileSwitcher.classList.add("add-color");
        console.log("hihihihi");
      } else {
        passwordContainer.removeAttribute("hidden", "");
        leftContainer.setAttribute("hidden", "");
        profileSwitcher.classList.remove("add-color");
        passwordSwitcher.classList.add("add-color");
        console.log("byebyebyebye");
      }
    });
  });
}
