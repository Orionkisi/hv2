import { renderindex } from "./lib/sites/index.js";
import { subSite } from "./lib/sites/subSite.js";



async function render(current){
    const subcurr = current.substring(0,10);
    if (current == ""){
        renderindex();
    } else {
        subSite(current);
    }
}

render(window.location.search);