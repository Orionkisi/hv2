import { el } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchJson } from "../components/felch.js";
import { keywords } from "./keywords.js";


export async function subSite(sub){
    console.log(sub);
    const kurl = sub.substring(6, sub.length-1).split(";");
    console.log(kurl[0]);
    console.log(kurl[1]);

    const root = document.querySelector("#app")
    const indexJson = await fetchJson("./data/index.json")
    const Json = await fetchJson(`./data/${kurl[0]}/index.json`);
    console.log("rendering", root, Json.title);


    const headerElement = document.createElement('header')
    const h1Element = document.createElement('h1');
    h1Element.textContent = Json.title;
    headerElement.appendChild(h1Element);

    headerElement.appendChild(renderNavigation(indexJson.navigation));

    
    const subsubNavigation = el('ul', {});

    for (const item of Json.content){
        const { type, url, slug, title, text } = item;
        /* sama og
        const title = item.title;
        const slug = item.slug;
        ...
        */
        const href = `/?type=${kurl[0]};${slug};`;
        const navItemElement = el('li', {}, el('a', { href }, title), el('p', {}, text));
        subsubNavigation.appendChild(navItemElement);
    }

    const mainElement = el(
        'main', 
        {},
        subsubNavigation
    );

    if (kurl[1] == "lectures"){
        lectures(kurl[0]);
    } else if (kurl[1] == "keywords"){
        const cards = await keywords(kurl[0]);
        mainElement.appendChild(cards);
    } else if (kurl[1] == "questions"){
        questions(kurl[0]);
    }

    const footerElement = el('footer', {},indexJson.footer);

    root.appendChild(headerElement);
    root.appendChild(mainElement);
    root.appendChild(footerElement);
}