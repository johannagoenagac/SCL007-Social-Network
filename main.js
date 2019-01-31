//Manejo del DOM

window.onload = () =>{
    header.style.display = "block";
    login.style.display = "none";
    home.style.display = "none";
    profile.style.display = "none";
    recipe.style.display = "none";
    search.style.display = "none";
}

homeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Home";
});

searchLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Buscar";
});

addLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Post";
});

recipeLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Receta";
});

userLogo.addEventListener("click", () => {
    pageGuide.innerHTML = "Perfil";
});