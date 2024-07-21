
//background.js

import { TextstyleType, ActionType } from "./constants.js";


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: ActionType.HIGHLIGHT,
        title: "Highlight",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: ActionType.TEXTSTYLE,
        title: "Textstyle",
        contexts: ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === ActionType.HIGHLIGHT){
        chrome.tabs.sendMessage(tab.id, {
            action: ActionType.HIGHLIGHT,
            highlightColor: "yellow"
        });
    }
    else if (info.menuItemId === ActionType.TEXTSTYLE){
        chrome.tabs.sendMessage(tab.id, {
            action: ActionType.TEXTSTYLE,
            textstyleType: TextstyleType.BOLD

        });
    }
});

