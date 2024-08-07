const searchIcon = document.querySelector('.search-icons');
const searchForm = document.querySelector('.search-from');
searchIcon.addEventListener  ("click", () => {
    searchForm.classList.add("active");
    setTimeout (() => {
        searchForm.classList.remove("active");
    }, 5000) ;

})