import { el } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchJson } from "../components/felch.js";


export async function renderindex(){
    const root = document.querySelector("#app")
    const indexJson = await fetchJson("./data/index.json");

    const headerElement = document.createElement('header')
    const h1Element = document.createElement('h1');
    h1Element.textContent = indexJson.title;
    headerElement.appendChild(h1Element);

    const mainElement = el(
        'main', 
        {}, 
        el('section', {}, el('p', {}, indexJson.description, renderNavigation(indexJson.navigation)))
    );

    headerElement.appendChild(renderNavigation(indexJson.navigation));

    const footerElement = el('footer', {},indexJson.footer);

    root.appendChild(headerElement);
    root.appendChild(mainElement);
    root.appendChild(footerElement);
}