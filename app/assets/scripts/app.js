console.log('app.js');

let show = true

document.getElementById("eye").addEventListener("click", ()=>{
  let eye = document.getElementById('eye')
  let password = document.getElementById("password")
  show ? eye.textContent = "visibility_off" : eye.textContent = "visibility"
  show ? password.setAttribute("type", "text") : password.setAttribute("type", "password")
  show = !show
})
