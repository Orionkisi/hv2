import { el } from "../elements.js";
import { fetchJson } from "../components/felch.js";

export async function questions(subsub){

    console.log("hello");
    console.log(subsub);

    const qJson = await fetchJson(`./data/${subsub}/questions.json`);

    const questions = el('ul', {});
    let x = 0;

    for (const item of qJson.questions){
        const { question, answers } = item;
        console.log(question)
        /* sama og
        const question = item.question;
        const english = item.english;
        
        
        const href = `/?type=${kurl[0]};${slug};`;
        const navItemElement = el('li', {}, el('a', { href }, title), el('p', {}, text));
        subsubNavigation.appendChild(navItemElement);
        */

        const answersElement = el('section', {class: "answers"}, )
        const Answers = [];
        let i = 0;

        for (const item of answers){
            const { answer, correct } = item;
            if (correct == false) {
                Answers[i]=el("button", {}, answer)
            } else {
                Answers[i]=el("button", {class: correct}, answer)
            }
            
            console.log(answer)
            console.log(correct)
            i++;
        }

        shuffleArray(Answers)
        for (let i = 0; i<4; i++){
            answersElement.appendChild(Answers[i]);
        }

        const currentQuestion = el('h1', {}, question)
        currentQuestion.appendChild(el('li', {}, answersElement))
        questions.appendChild(currentQuestion)
    }
    return(questions);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}