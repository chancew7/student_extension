
import * as constants from "../constants.js";

export function sendHighlightMessage(color, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.HIGHLIGHT,
        highlightColor: color,
        key : 'annotate'
    });
}
export function sendTextstyleMessage(textstyleType, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.TEXTSTYLE,
        textstyleType: textstyleType,
        key : 'annotate'
    });
}
export function sendCommentMessage(tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.COMMENT,
        commentMessage: "type to enter text",
        key: 'annotate'
    });
}
export function sendClearMessage(tab){
    chrome.tabs.sendMessage(tab.id, {
        action: constants.ActionType.CLEAR,
        key: 'annotate'
    });
}
export function getHighlightColor(id){
    return id.split('_')[1];
}
export function getTextstyleType(id){
    return id.split('_')[1];
}
export function findExistingMarkup(){
    return null
}
export function loadMarkup(){
    let existingMarkup = findExistingMarkup()
    if (existingMarkup != null){
        return existingMarkup;
    }
    else{
        return new markup(getCurrentTabUrl, "password", null, null)
    }
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