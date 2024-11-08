import { el } from "./lib/elements.js";

async function fetchIndex(){
    const file = "/data/index.json"

    const response = await fetch(file);
    const json = await response.json();

    return json;
}


async function render(root){
    const indexJson = await fetchIndex();
    console.log("rendering", root, indexJson.title);

    const headerElement = document.createElement('header')

    const h1Element = document.createElement('h1');
    h1Element.textContent = indexJson.title;
    headerElement.appendChild(h1Element);

    const mainElement = el('main', {}, el('section', {}, el('p', {}, indexJson.description)));

    const footerElement = el('footer', {},indexJson.footer);

    root.appendChild(headerElement);
    root.appendChild(mainElement);
    root.appendChild(footerElement);
}


const root = document.querySelector("#app")

render(root);