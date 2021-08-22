function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function function_logout() {
    alert("You are logout");
}

function messFuction() {
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    if (parseInt(pass).lenght < 6) {
        alert('Not wrong.');
        return false;
    }
}