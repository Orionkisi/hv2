import { el } from "../elements.js";
import { fetchJson } from "../components/felch.js";

export async function questions(subsub){

    const qJson = await fetchJson(`./data/${subsub}/questions.json`);

    const questions = el('ul', {class:"quiz"});
    let x = 0;

    for (const item of qJson.questions){
        const { question, answers } = item;
        /* sama og
        const question = item.question;
        const english = item.english;
        */
        x++;
        let qnum = "qnum" + x;
        const individualQuestion = el('li', {})
        individualQuestion.appendChild(el('h1', {}, question))


        const answersElement = el('section', {class: "answers"})
        const Answers = [];
        let i = 0;

        for (const item of answers){
            const { answer, correct } = item;
            if (correct == false) {
                Answers[i]=el("button", {}, answer)
            } else {
                Answers[i]=el("button", {onclick:`showCard(${qnum})`}, answer)
            }
            i++;
        }

        shuffleArray(Answers)
        for (let i = 0; i<4; i++){
            answersElement.appendChild(Answers[i]);
        }
        individualQuestion.appendChild(answersElement)
        individualQuestion.appendChild(el('div', {id:qnum, class: "hiddencard"}, "RÉTT! :D"))
        questions.appendChild(individualQuestion)
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