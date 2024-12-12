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
    if (getEl("app") != null){
        getEl("app").style.display = "none";
    }

    newPage.style.display = "block";
    
    console.log(`Successfully changed to page [${page}]`)
}

function appLoaded(){
    if (loggedIn){
        getEl("loading").style.display = "none" 
        changePage("app")
    }

}

function userLoad(){
    
    if (!loggedIn){
        changePage("startPage")
        getEl("loading").style.display = "none"
    }
    document.body.insertBefore(createAppEl(), document.getElementById("script"))
}

function createAppEl(){
    let newEl = document.createElement("iframe")
    newEl.src = "app/app.html"
    newEl.id = "app"
    newEl.frameBorder = 0;
    newEl.style.display = "none";
    return newEl;
}