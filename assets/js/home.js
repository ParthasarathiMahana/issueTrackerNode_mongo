const formOpenerButton = document.getElementsByClassName("form-opener")[0];
formOpenerButton.addEventListener("click", ()=>{
    let display = document.getElementsByClassName("form-container")[0].style.display;
    if(display == ""){
        document.getElementsByClassName("form-container")[0].style.display = "flex";
    }
    else{
        document.getElementsByClassName("form-container")[0].style.display = "";
    }
})