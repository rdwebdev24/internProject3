let registerBtn = document.getElementById("register");
let form = document.getElementById("form");

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const a = new FormData(form);
  const user = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  let userArray = [];
  for (const [key, value] of a) {
     userArray.push(value);
  }
  user.first_name = userArray[0];
  user.last_name = userArray[1];
  user.email = userArray[2];
  user.password = userArray[3];

  const url = "http://localhost:3000/register"

  fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
         if(data.status==400) alert("please enter all inputs")
         else if(data.status==409) alert("user elready exist")
         else if(data.status==201) {window.location = 'http://127.0.0.1:5500/frontend_/MainPage/index.html'}
         else alert("network error")
    })
    .catch((err) => {
     // alert("all inputs are required")
     console.log(err)});
});
