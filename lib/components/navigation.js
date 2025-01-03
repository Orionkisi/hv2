import { el } from "../elements.js";

export function renderNavigation(navigation, onClickHandler) {
    /*
    <nav>
        <a href="${url}">${title}</a>
        <a href="${url}">${title}</a>
        <a href="${url}">${title}</a>
    </nav>
    */

    const navigationElement = el('ul', {});

    for (const item of navigation){
        const { title, slug } = item;

        /* sama og
        const title = item.title;
        const slug = item.slug;
        */
        const href = `/?type=${slug};`;
        const navItemElement = el('li', {}, el('a', { href, class:'navigation_link', click: onClickHandler }, title));
        navigationElement.appendChild(navItemElement);
    }
    return(el('nav', {},navigationElement));
}