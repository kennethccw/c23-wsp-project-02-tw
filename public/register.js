import { searchBar } from "./forImport.js";
window.onload = async () => {
  register();
  searchBar();
  // logout();
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

function register() {
  document.querySelector("#registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formBody = {};
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const date = form.date.value;
    console.log(new Date(date));

    const checkbox = form.checkbox.checked;
    formBody["username"] = username;
    formBody["email"] = email;
    formBody["password"] = password;
    formBody["phone"] = phone;
    formBody["date"] = date;
    formBody["checkbox"] = checkbox;
    const resp = await fetch("/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    const data = await resp.json();
    if (resp.status !== 201) {
      alert(data.message);
    } else {
      alert("successful submission");
      form.reset();

      console.log("finished uploading post");
      window.location = "/"; //succeed to get to the product page
    }
  });
}
