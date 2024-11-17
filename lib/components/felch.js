import { lunch } from "../components/lunch.js";


export async function fetchJson(file){
    try {
        const response = await fetch(file);
        const json = await response.json();
        return json;
    } catch (err) {
        lunch();
    }
}