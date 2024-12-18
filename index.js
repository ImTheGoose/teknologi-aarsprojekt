const loggedIn = false;
let waitingFor = null;

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
    let pages = ["startPage","loginPage","registerPage","app"]

    pages.forEach((id) => {
        const el = getEl(id)
        if (el){
            el.style.display = "none";
        }
    })

    newPage.style.display = "block";
    
    console.log(`Successfully changed to page [${page}]`)
}


function waitCheck(obj){
    if (obj === waitingFor){
        getEl("loading").style.display = "none"
        changePage(obj)
    }
}

function wait(obj){
    waitingFor = obj
    getEl("loading").style.display = "flex"
}


function userLoad(){
    if (!loggedIn){
        wait("startPage")
        window.asyncLoadWave(0)

    }else{
        waitingFor = "app"
        window.asyncLoadWave(1)
    }
}

