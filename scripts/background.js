
//background.js

import { TextstyleType, ActionType } from "./constants.js";


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: ActionType.HIGHLIGHT,
        title: "Highlight",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "textstyle",
        title: "Textstyle",
        contexts: ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === ActionType.HIGHLIGHT){
        chrome.tabs.sendMessage(tab.id, {
            action: "highlight",
            highlightColor: "yellow"
        });
    }
    else if (info.menuItemId === "textstyle"){
        chrome.tabs.sendMessage(tab.id, {
            action: "textstyle",

        });
    }
});

