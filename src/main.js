//Manejo del DOM

const home = document.getElementById("homeLogo");
const search = document.getElementById("searchLogo");
const add = document.getElementById("addLogo");
const recipe = document.getElementById("recipeLogo");
const user = document.getElementById("userLogo");
const pageGuide = document.getElementById("pageGuide");

home.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
});

search.addEventListener("click", () => {
    pageGuide.innerHTML = "Buscar";
});

add.addEventListener("click", () => {
    pageGuide.innerHTML = "Post";
});

recipe.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

user.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
});