const addBugButton = document.getElementsByClassName("add_bug_button")[0];

addBugButton.addEventListener("click", ()=>{
    let display = document.getElementsByClassName("add_issue_form_container")[0].style.display;
    if(display=="" || display=="none"){
        document.getElementsByClassName("add_issue_form_container")[0].style.display = "block"
    }else{
        document.getElementsByClassName("add_issue_form_container")[0].style.display = "none"
    }
})

const filterButton = document.getElementsByClassName("filter_btn")[0];
filterButton.addEventListener("click",()=>{
    let display = document.getElementsByClassName("filter_form_container")[0].style.display;
    if(display == "" || display == "none"){
        document.getElementsByClassName("filter_form_container")[0].style.display = "flex";
    }else{
        document.getElementsByClassName("filter_form_container")[0].style.display = "none";
    }
})

const filterByLabel = document.getElementsByClassName("filter_by_label_div")[0];
filterByLabel.addEventListener("click",(e)=>{
    let display =  document.getElementsByClassName("label_filter_option_container")[0].style.display;
    if(display == "" || display=="none"){
        document.getElementsByClassName("label_filter_option_container")[0].style.display = "block";
    }else{
        document.getElementsByClassName("label_filter_option_container")[0].style.display = "none";
    }
})

const filterByAuthor = document.getElementsByClassName("filter_by_author_div")[0];
filterByAuthor.addEventListener("click",()=>{
    let display = document.getElementsByClassName("list_of_authors")[0].style.display;
    if(display == "" || display == "none"){
        document.getElementsByClassName("list_of_authors")[0].style.display = "block";
    }else
    {
        document.getElementsByClassName("list_of_authors")[0].style.display = "none";
    }
})

// const labelInputBox = document.getElementsByClassName("labelInput")[0];
// labelInputBox.addEventListener("input",()=>{
    
// })