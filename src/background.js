
//background.js

import { TextstyleType, ActionType, HighlightColors, IdPreamble, CommandShortcuts, Titles } from "./constants.js";
import { markup } from "./markup.js";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDwOQPRg62Tc8Tz6gt5Fj6FLvuwE9Lsz3U",
    authDomain: "markup-database.firebaseapp.com",
    projectId: "markup-database",
    storageBucket: "markup-database.appspot.com",
    messagingSenderId: "137230744992",
    appId: "1:137230744992:web:952acf53f94a0a7e0378c5",
    measurementId: "G-DLY6ZBHLF2"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//context menu buttons 
chrome.runtime.onInstalled.addListener(() => {


    chrome.contextMenus.create({
        id: ActionType.HIGHLIGHT,
        title: Titles.HIGHLIGHT,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.HIGHLIGHT + HighlightColors.BLUE,
        title: "Blue",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.HIGHLIGHT + HighlightColors.GREEN,
        title: "Green",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.HIGHLIGHT + HighlightColors.RED,
        title: "Red",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.HIGHLIGHT + HighlightColors.YELLOW,
        title: "Yellow" + " ".repeat(8) + CommandShortcuts.HIGHLIGHT,
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: ActionType.TEXTSTYLE,
        title: "Textstyle",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.TEXTSTYLE + TextstyleType.BOLD,
        title: Titles.BOLD,
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.TEXTSTYLE + TextstyleType.ITALIC,
        title: Titles.ITALIC,
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: IdPreamble.TEXTSTYLE + TextstyleType.UNDERLINE,
        title: Titles.UNDERLINE,
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: ActionType.COMMENT,
        title: Titles.COMMENT,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: "remove_button",
        title: "Clear Annotation",
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: "remove_highlight",
        title: "Clear Highlight",
        parentId : "remove_button",
        contexts:["selection"]
    });


});

//chrome.webNavigation.onCompleted.addListener(() => {
//initialize markup object in database
//});


function sendHighlightMessage(color, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: ActionType.HIGHLIGHT,
        highlightColor: color,
        key : 'annotate'
        
    });
}
function sendTextstyleMessage(textstyleType, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: ActionType.TEXTSTYLE,
        textstyleType: textstyleType,
        key : 'annotate'
    });
}
function sendCommentMessage(tab){
    chrome.tabs.sendMessage(tab.id, {
        action: ActionType.COMMENT,
        commentMessage: "type to enter text",
        key : 'annotate'
    });
}
function getHighlightColor(id){
    return id.split('_')[1];
}
function getTextstyleType(id){
    return id.split('_')[1];
}
function findExistingMarkup(){
    return null
}
function loadMarkup(){
    let existingMarkup = findExistingMarkup()
    if (existingMarkup != null){
        return existingMarkup;
    }
    else{
        return new markup(getCurrentTabUrl, "password", null, null)
    }
}
function getCurrentTabUrl(){
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

chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.parentMenuItemId === ActionType.HIGHLIGHT){ 
        let color = getHighlightColor(info.menuItemId);
        sendHighlightMessage(color, tab);
    }
    else if (info.parentMenuItemId === ActionType.TEXTSTYLE){
        let textstyleType = getTextstyleType(info.menuItemId);
        sendTextstyleMessage(textstyleType, tab)
    }
    else if (info.menuItemId === ActionType.COMMENT){
        sendCommentMessage(tab);
    }
    else if (info.parentMenuItemId === "remove_button"){
        chrome.tabs.sendMessage(tab.id, {
            action: "remove_highlight",
        });
    }
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if (message.key === 'cmd_shortcut'){
        chrome.tabs.query({active: true, currentWindow: true }, function (tabs){
            if (tabs.length > 0){
                const tab = tabs[0];

                switch(message.action){
                    case ActionType.HIGHLIGHT:
                        sendHighlightMessage(message.color, tab);
                        break;
                    case ActionType.TEXTSTYLE:
                        sendTextstyleMessage(TextstyleType[message.textstyleType.toUpperCase()], tab);
                        break;
                    case ActionType.COMMENT:
                        sendCommentMessage(tab);
                        break;
                }

            }
        });
    }
});




