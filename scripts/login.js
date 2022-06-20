async function registerUser() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var data = {
        username: firstName + " " + lastName,
        email: email,
        password: password,
        is_admin: "0"
    }
    const response = await fetch("https://raw.githubusercontent.com/BobuDragos/tW-MeoW/main/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })

    window.location.href = "\index.html";
}

async function loginUser() {
    var email = document.getElementById("emaillogin").value;
    var password = document.getElementById("passwordlogin").value;

    var data = {
        email: email,
        password: password
    }
    
    var foundAccount = false;
    var userName = "";

    fetch('https://raw.githubusercontent.com/BobuDragos/tW-MeoW/main/users')
    .then(response => response.json())
    .then(data => {
      console.log(data["users"]);
      data["users"].forEach(user => {
        console.log(user["email"]);
        if(user["email"] == email){
            if(user["password"] == password){
                foundAccount = true;
                userName = user["username"];
                console.log("ok");
            }
    }
      }
      );
      if(foundAccount){
      alert("Welcome back, " + userName + "!");
      window.location.href = "\index.html";
      }else{
          alert("Account not found!");
      }
    })
    .catch(error => console.error(error))

}