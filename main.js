import { renderindex } from "./lib/sites/index.js";
import { subSite } from "./lib/sites/subSite.js";
import { lunch } from "./lib/components/lunch.js";



console.log(window.location.search);

async function render(current){
    const subcurr = current.substring(0,10);
    if (current == ""){
        renderindex();
    } else if (subcurr != "?type=html" && subcurr != "?type=java" && subcurr != "?type=css;") {
        lunch();
    } else {
        subSite(current);
    }
}

render(window.location.search);