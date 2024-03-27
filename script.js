const accessKey="B0tbSkYGBkEsBKbzzUB6c7tSq4Z9HyyaaGLjtW4Dwdo";


const formEl=document.querySelector("form");
const inputEl=document.getElementById("search-input");
const searchResults=document.querySelector(".search-results");
const showMore=document.getElementById("show-more-button");

let inputData=""; /*whatever user enters*/
let page=1; /*default page number will be 1 and when user clicks showmore, page number will go on increasing*/

async function searchImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    // Our Api will take keyword entered and based on that it will fetch data from unsplash
    const response=await fetch(url);
    const data=await response.json();
    // Convert json data to image and text form of output
    const results=data.results;
    if(page===1){
        // innerHTML is the default container
        searchResults.innerHTML="";
    }
        // to show the results(image and text) one by one
        results.map((result)=>{
            const imageWrapper=document.createElement("div"); //push all the data in the <div>(searchResults) template
            imageWrapper.classList.add("search-result");
            const image=document.createElement("img");
            image.src=result.urls.small;
            image.alt=result.alt_description;
            const imageLink=document.createElement("a");
            imageLink.href=result.links.html;
            imageLink.target="_blank";
            imageLink.textContent=result.alt_description;

            // Append those elements into HTML page
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });
        page++;
        if(page>1){
            showMore.style.display="block"; //change the display from "none" to "block which means to show the showmore button"
        }
    }
    //create event listener to take the keyword entered and show the output
    formEl.addEventListener("submit",(event)=>{
        event.preventDefault();
        page=1;
        searchImages();
    });

    showMore.addEventListener("click",()=>{
        searchImages();
    });


