var myIndex = 0;
carousel();
(function() {

    var navButton = document.querySelector("#nav-menu-button");
    var navUl = document.querySelector(".nav-ul");

    function toggleMobileMenu() {
        navUl.classList.toggle("hide-ul");
    }

    navButton.onclick = toggleMobileMenu;
}());

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    //x[myIndex-1].style.display = "block";
    setTimeout(carousel, 4000);
}

function parseCookie(str) {
    let cookie_key_val = str.split('; ').filter(x => x.includes("=")).map(x => x.split("="));
    let res = {};
    for (let el of cookie_key_val) {
        res[el[0]] = el[1];
    }
    return res;
}

function isAdminCookie() {
    if (parseCookie(document.cookie)["admin"] === "\"1\"") {
        document.getElementById("navv").innerHTML = document.getElementById("navv").innerHTML.replace(`<li><a class="nav-link" href="Myaccount.html">Account</a></li>`, `<li><a class="nav-link" href="1401040519092021.html">Admin</a></li>`);
    }
}