const loggedIn = false;

function getEl(id){
    return document.getElementById(id)
}


function changePage(page){
    console.log(page)
    let newPage = null
    if (page === "loginPage" || 
        page === "registerPage" || 
        page === "startPage" || 
        page === "app")
        {
        newPage = getEl(page)
        console.log(newPage)
    }else{
        console.log(`Error: Tried change page with [${page}]`)
        return;
    }
    getEl("startPage").style.display = "none";
    getEl("loginPage").style.display = "none";
    getEl("registerPage").style.display = "none";
    getEl("app").style.display = "none";
    newPage.style.display = "block";
    
    console.log(`Successfully changed to page [${page}]`)
}

function userLoad(){
    getEl("loading").style.display = "none"
    if (!loggedIn){
        changePage("startPage")
    }else{
        changePage("app")
    }
}