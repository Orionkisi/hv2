import { el } from "../elements.js";
import { fetchJson } from "../components/felch.js";

export async function keywords(subsub){

    console.log("hello");
    console.log(subsub);

    const kJson = await fetchJson(`./data/${subsub}/keywords.json`);

    const cards = el('ul', {});
    let x = 0;

    for (const item of kJson.keywords){
        x++;
        let cardnum = "card" + x;
        const { title, english, content } = item;
        /* sama og
        const title = item.title;
        const english = item.english;
        ...
        
        const href = `/?type=${kurl[0]};${slug};`;
        const navItemElement = el('li', {}, el('a', { href }, title), el('p', {}, text));
        subsubNavigation.appendChild(navItemElement);
        */
        let card = "hello";
        if (english == null){
            card = el('li', {}, el('p', {}, `${title}`), 
            el('button', 
                {onclick:`showCard(${cardnum})`}, 
                "show"), 
            el('div', {id:cardnum, class: "hiddencard"}, `${content}`))
        } else {
            card = el('li', {}, el('p', {}, `${title} (${english})`), 
            el('button', 
                {onclick:`showCard(${cardnum})`}, 
                "show"), 
            el('div', {id:cardnum, class: "hiddencard"}, `${content}`))
        }
        
        cards.appendChild(card);
    }
    return(cards);
}