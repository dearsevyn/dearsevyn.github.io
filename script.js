let currentPage = 1;

function flipPage(direction) {
    let newPage = currentPage + direction;
    const totalPages = document.querySelectorAll(".page").length;

    if (newPage > 0 && newPage <= totalPages) {
        document.getElementById(`page${currentPage}`).style.display = "none";
        document.getElementById(`page${newPage}`).style.display = "block";
        currentPage = newPage;
    }
}

function checkPassword(pageNumber) {
    const passwords = { 1: "secret123", 2: "hunt456" }; 
    const enteredPassword = document.getElementById(`password${pageNumber}`).value;

    if (enteredPassword === passwords[pageNumber]) {
        document.getElementById(`page${pageNumber}`).classList.remove("locked");
    } else {
        alert("Incorrect password. Try again!");
    }
}