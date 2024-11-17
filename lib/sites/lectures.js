import { el } from "../elements.js";
import { fetchJson } from "../components/felch.js";
import { lunch } from "../components/lunch.js"

export async function lectures(subsub, subsubsub){

    const lJson = await fetchJson(`./data/${subsub}/lectures.json`);



    const leLecture = el('section', {class:"lectures"});
    const lectureOptions = el('ul', {class:'lectureOptions'});
    let lectureContent = "hello";
    let i = 0;

    for (const item of lJson.lectures) {
        const { title, slug, content } = item;
        i++;
        let lectureNum = "lecture" + i;
        const href = `/?type=${subsub};lectures;${slug};`
        const lectureButton = el('li', {}, el('a',{ href }, title));
        lectureOptions.appendChild(lectureButton);

        if (subsubsub === slug) {
            lectureContent = el ('section', {class: 'lectureContent'})
            lectureContent.appendChild(el ('h1', {}, title));
            for (const kitem of content){
                const { type, data, caption, attribute } = kitem;
                if (type == "heading") {
                    lectureContent.appendChild(el('h1',{},data))
                }
                if (type == "text") {
                    lectureContent.appendChild(el('p',{},data))
                }
                if (type == "quote") {
                    lectureContent.appendChild(el('div',{class:"quote"},el('p',{},data), el('p',{},attribute)))
                }
                if (type == "image") {
                    lectureContent.appendChild(el('div', {}, el('img',{src:`./${data}`}), el('p',{}, caption)))
                }
                if (type == "list") {
                    const dataList = el('ul', {});
                    for (const hello of data) {

                        dataList.appendChild(el('li', {}, hello))
                    }
                    lectureContent.appendChild(dataList);
                }
            }
        }
    }

    leLecture.appendChild(lectureOptions);
    try{
        if(subsubsub != undefined){
            leLecture.appendChild(lectureContent);
        }
    } catch (err) {
        lunch();
    }

    
    return(leLecture);
}