
import * as constants from "../constants.js";

import { db } from './firebase-init.js';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';



export function sendHighlightMessage(color, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.HIGHLIGHT,
        highlightColor: color,
        key : constants.MessageKeys.ANNOTATION, 
    }, (response) => {
        if (chrome.runtime.lastError && !chrome.runtime.lastError.message.includes("Could not establish connection. Receiving end does not exist")
            && !chrome.runtime.lastError.message.includes("The message port closed before a response was received")) {
            console.error("error sending message" + chrome.runtime.lastError.message);
        }
    });
}
export function sendTextstyleMessage(textstyleType, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.TEXTSTYLE,
        textstyleType: textstyleType,
        key : constants.MessageKeys.ANNOTATION
    }, (response) => {
        if (chrome.runtime.lastError && !chrome.runtime.lastError.message.includes("Could not establish connection. Receiving end does not exist")
            && !chrome.runtime.lastError.message.includes("The message port closed before a response was received")) {
            console.error("error sending message" + chrome.runtime.lastError.message);
        }
    });
}
export function sendCommentMessage(tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.COMMENT,
        commentMessage: "type to enter text",
        key: constants.MessageKeys.ANNOTATION
    }, (response) => {
        if (chrome.runtime.lastError && !chrome.runtime.lastError.message.includes("Could not establish connection. Receiving end does not exist")
            && !chrome.runtime.lastError.message.includes("The message port closed before a response was received")) {
            console.error("error sending message" + chrome.runtime.lastError.message);
        }
    });
}
export function sendClearMessage(tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.CLEAR,
        key: constants.MessageKeys.ANNOTATION
    }, (response) => {
        if (chrome.runtime.lastError && !chrome.runtime.lastError.message.includes("Could not establish connection. Receiving end does not exist")
            && !chrome.runtime.lastError.message.includes("The message port closed before a response was received")) {
            console.error("error sending message" + chrome.runtime.lastError.message);
        }
    });
}
export function getHighlightColor(id){
    return id.split('_')[1];
}
export function getTextstyleType(id){
    return id.split('_')[1];
}
export function getCurrentTabUrl(){
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active:true, currentWindow: true}, (tabs) => {
            if (chrome.runtime.lastError){
                return reject(chrome.runtime.lastError);
            }
            if (tabs.length > 0){
                resolve(tabs[0].url);
            }
            else{
                reject("No active tab found");
            }
        });
    });
}


export async function saveAnnotationToDatabase(annotation){

    const markupDocRef = doc(db, 'markups', annotation.markup_key); 

        await updateDoc(markupDocRef, {
            annotations: arrayUnion(annotation)
        });
}


