import { el } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchJson } from "../components/felch.js";
import { keywords } from "./keywords.js";
import { questions } from "./questions.js";
import { lectures } from "./lectures.js";
import { lunch } from "../components/lunch.js";

export async function subSite(sub){
    const kurl = sub.substring(6, sub.length-1).split(";");

    const root = document.querySelector("#app")
    const indexJson = await fetchJson("./data/index.json")
    const Json = await fetchJson(`./data/${kurl[0]}/index.json`);


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

    const headElement = document.querySelector("head")

    if (kurl[1] == "lectures"){
        const lect = await lectures(kurl[0], kurl[2]);
        mainElement.appendChild(lect);
    } else if (kurl[1] == "keywords"){
        const cards = await keywords(kurl[0]);
        mainElement.appendChild(cards);
        var scriptElement = document.createElement('script');
        scriptElement.textContent = `
            function showCard(num) {
                num.removeAttribute("class");
            }
        `;
        headElement.appendChild(scriptElement)
    } else if (kurl[1] == "questions"){
        const questi = await questions(kurl[0]);
        mainElement.appendChild(questi);
        var scriptElement = document.createElement('script');
        scriptElement.textContent = `
            function showCard(num) {
                num.removeAttribute("class");
            }
        `;
        headElement.appendChild(scriptElement)
    } else if (kurl[1] != undefined){
        lunch();
    }

    const footerElement = el('footer', {},indexJson.footer);

    root.appendChild(headerElement);
    root.appendChild(mainElement);
    root.appendChild(footerElement);
}