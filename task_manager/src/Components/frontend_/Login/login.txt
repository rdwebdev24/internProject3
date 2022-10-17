let login = document.getElementById("login");
let form = document.getElementById("form");

login.addEventListener("click", (e) => {
  e.preventDefault();
  const a = new FormData(form);
  const user = {
    email: "",
    password: "",
  };
  let userArray = [];
  for (const [key, value] of a) {
     userArray.push(value);
  }
  user.email = userArray[0];
  user.password = userArray[1];

  const url = "http://localhost:3000/login"

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
         else if(data.status==401) alert("invalid credientials")
         else if(data.status==200) {window.location = 'http://127.0.0.1:5500/frontend_/MainPage/index.html'}
         else alert("network error")
    })
    .catch((err) => {
     // alert("all inputs are required")
     console.log(err)});
});
