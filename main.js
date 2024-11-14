import { renderindex } from "./lib/sites/index.js";
import { subSite } from "./lib/sites/subSite.js";



console.log(window.location.search);

async function render(current){
    if (current == ""){
        renderindex();
    } else {
        subSite(current);
    }
}

render(window.location.search);