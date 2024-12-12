const asyncStatus = {
    app:{
        priority: 1,
        loaded: false,
        iframe:{
            src:"app/app.html",
            id:"app",
            parent:document,
        },
        children:[
            "profilPage"
        ]
    },
    startPage:{
        priority: 0,
        loaded: false,
        iframe:{
            src:"startPage/startPage.html",
            id:"startPage",
            parent:document,
        }
    },
    loginPage:{
        priority: 0,
        loaded: false,
        iframe:{
            src:"loginPage/loginPage.html",
            id:"loginPage",
            parent:document,
        }
    },
    registerPage:{
        priority: 0,
        loaded: false,
        iframe:{
            src:"registerPage/registerPage.html",
            id:"registerPage",
            parent:document,
        }
    },
    profilPage:{
        priority: 2,
        loaded: false,
        iframe:{
            src:"profil/profilPage.html",
            id:"profilPage",
            parent:null,
            formatting:{
                class:"iframe",
                height:"82%",
                width:"100%",
            }
        }
    }
}

const prefix = `[Async] `
let currentWave = 0;

//Short hand for load complete
function asyncLoadComplete(obj){ asyncLoadComplete(obj, null) }


//Function that gets called onLoad() for the object that gets loaded.
function asyncLoadComplete(obj,parentForChildren){
    let object = asyncStatus[obj]
    object.loaded = true
    console.log(`${prefix} Async load complete for {${obj}}`)
    window.waitCheck(obj)

    //Adds object as parent for children if it has those
    if (parentForChildren != null && object.children != null){
        for (let i = 0; i < object.children.length; i++){
            let childObj = object.children[i]
            let childObject = asyncStatus[childObj]
            childObject.iframe.parent = parentForChildren
            console.log(`${prefix} Assigned {${parentForChildren}} as parent for {${childObj}}`)
        }
    }

    if (checkAsyncLoadWave(currentWave)){
        currentWave++
        asyncLoadWave(currentWave)
    }
}

//Function for initiating a load of an object.
function asyncLoad(obj){
    console.log(`${prefix} Beginning async load for {${obj}}`)
    let object = asyncStatus[obj]
    let loadEl = document.createElement("iframe")
    loadEl.style.display = "none"
    loadEl.frameBorder = 0;
    loadEl.id = object.iframe.id
    loadEl.src = object.iframe.src

    //Applies formatting to object if present
    if (object.iframe.formatting){
        loadEl.classList.add(object.iframe.formatting.class)
        loadEl.height = object.iframe.formatting.height
        loadEl.width = object.iframe.formatting.width
    }

    //Appends object to body right before the first script object.
    let parent = object.iframe.parent
    parent.body.insertBefore(loadEl, parent.getElementById("script"))
    console.log(`${prefix} Async iframe append complete for {${obj}}`)
}


function asyncLoadWave(wave){
    if (wave != currentWave) { currentWave = wave }

    for (const key in asyncStatus){
        const innerObject = asyncStatus[key]
        if (innerObject.priority == wave){ asyncLoad(key) }
    }

}

function checkAsyncLoadWave(wave){
    let loaded = true;
    for (const key in asyncStatus){
        const innerObject = asyncStatus[key]
        if (innerObject.priority == wave){
            if (!innerObject.loaded) 
                { 
                    loaded = false
                    break;
                }
        }
    }
    return loaded;
}



