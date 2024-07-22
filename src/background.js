
//background.js

import { TextstyleType, ActionType, HighlightColors, Id_preamble, CommandShortcuts, Titles } from "./constants.js";


chrome.runtime.onInstalled.addListener(() => {


    chrome.contextMenus.create({
        id: ActionType.HIGHLIGHT,
        title: Titles.HIGHLIGHT,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.HIGHLIGHT + HighlightColors.BLUE,
        title: "Blue",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.HIGHLIGHT + HighlightColors.GREEN,
        title: "Green",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.HIGHLIGHT + HighlightColors.RED,
        title: "Red",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.HIGHLIGHT + HighlightColors.YELLOW,
        title: Titles.HIGHLIGHT,
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: ActionType.TEXTSTYLE,
        title: "Textstyle",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.TEXTSTYLE + TextstyleType.BOLD,
        title: Titles.BOLD,
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.TEXTSTYLE + TextstyleType.ITALIC,
        title: Titles.ITALIC,
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: Id_preamble.TEXTSTYLE + TextstyleType.UNDERLINE,
        title: Titles.UNDERLINE,
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });

});

function sendHighlightMessage(color, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: ActionType.HIGHLIGHT,
        highlightColor: color
    });
}
function sendTextstyleMessage(textstyleType, tab){
    chrome.tabs.sendMessage(tab.id, {
        action: ActionType.TEXTSTYLE,
        textstyleType: textstyleType
    });
}
function getHighlightColor(id){
    return id.split('_')[1];
}
function getTextstyleType(id){
    return id.split('_')[1];
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
});

chrome.commands.onCommand.addListener((command) => {

    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
        const tab = tabs[0];
        if (command === "highlight"){
            sendHighlightMessage(HighlightColors.DEFAULT, tab);
        }
        else if (command === "bold" || command === "underline" || command === "italic"){
            sendTextstyleMessage(TextstyleType[command.toUpperCase()],tab);
        }
    });

});

