var bookName = document.getElementById("bookmarkerName")
var bookURL = document.getElementById("bookmarkerURL")

var bookmarks = []
if(localStorage.getItem("bookmarks") != null){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    displayBookmarks()
}
function addbookmarh(){
    
    var bookmark = {
        name : bookName.value , 
        url : bookURL.value
    }
    nameValidation()
    isExist()
    if(isExist() && nameValidation()){
        bookmarks.push(bookmark)
        document.getElementById("nameWarning").innerHTML = ""
        document.getElementById("urlWarning").innerHTML = ""
        clearInputs()
    }
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks))
    displayBookmarks()
    
}
function nameValidation(){
    var name = true
    var url = true
    document.getElementById("nameWarning").classList.replace("d-block","d-none")
    document.getElementById("urlWarning").classList.replace("d-block","d-none")

    if (bookName.value == ""){
        document.getElementById("nameWarning").innerHTML = "<h5>Name is required</h5>"
        document.getElementById("nameWarning").classList.replace("d-none","d-block")
        name = false
    }
    if (bookURL.value == ""){
        document.getElementById("urlWarning").innerHTML = "<h5>URL is required</h5>"
        document.getElementById("urlWarning").classList.replace("d-none","d-block")

        url = false
    }
    else if (validUrl()==false){
        document.getElementById("urlWarning").innerHTML = "<h5>URL muts start http or https</h5>"
        document.getElementById("urlWarning").classList.replace("d-none","d-block")

        url = false
    }
    return (name && url)
}
function isExist(){
    var isTrue = true
    for (var i = 0 ; i<bookmarks.length ; i++){
        if (bookName.value == bookmarks[i].name){
            document.getElementById("nameWarning").innerHTML = `<h5>Name ${bookmarks[i].name} is already exist</h5>`
            document.getElementById("nameWarning").classList.replace("d-none","d-block")
            isTrue =  false
            break;
        }
    }
    return isTrue
}


function displayBookmarks(){
    var content = ``
    for(var i=0 ; i<bookmarks.length;i++){
       content+= `
    <div class="bg-light-subtle mb-3 container">
    <div class="d-flex p-3 justify-content-between w-75">
    <h2  me-3>${bookmarks[i].name}</h2>
    <div">
    <a href="${bookmarks[i].url}" target="_blank" class="btn btn-primary m-2">Visit</a>
    <button onclick='deleteBm(${i})' class="btn btn-danger">Delete</button></div>
    </div>
    </div>
        `
    }
    
    document.getElementById("bookmarkerlist").innerHTML = content;
}

function clearInputs(){
document.getElementById("bookmarkerName").value = ""
document.getElementById("bookmarkerURL").value = ""
}

function deleteBm(index){
    bookmarks.splice(index,1)
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayBookmarks()
}

function validUrl()
{
    var regex=/((https?:\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm;
    return regex.test(bookURL.value)

}

