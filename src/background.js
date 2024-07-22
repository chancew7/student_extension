
//background.js

import { TextstyleType, ActionType, HighlightColors } from "./constants.js";


chrome.runtime.onInstalled.addListener(() => {


    chrome.contextMenus.create({
        id: ActionType.HIGHLIGHT,
        title: "Highlight",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "highlight_" + HighlightColors.BLUE,
        title: "Blue",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: "highlight_" + HighlightColors.GREEN,
        title: "Green",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: "highlight_" + HighlightColors.RED,
        title: "Red",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: "highlight_" + HighlightColors.YELLOW,
        title: "Yellow",
        parentId: ActionType.HIGHLIGHT,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: ActionType.TEXTSTYLE,
        title: "Textstyle",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "textstyle_" + TextstyleType.BOLD,
        title: "Bold",
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: "textstyle_" + TextstyleType.ITALIC,
        title: "Italic",
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: "textstyle_" + TextstyleType.UNDERLINE,
        title: "Underline",
        parentId: ActionType.TEXTSTYLE,
        contexts:["selection"]
    });

});


chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.parentMenuItemId === ActionType.HIGHLIGHT){ 
        let color = info.menuItemId.split('_')[1]; 
        chrome.tabs.sendMessage(tab.id, {
            action: ActionType.HIGHLIGHT,
            highlightColor: color
        });
    }
    else if (info.parentMenuItemId === ActionType.TEXTSTYLE){
        let textstyleType = info.menuItemId.split('_')[1];
        chrome.tabs.sendMessage(tab.id, {
            action: ActionType.TEXTSTYLE,
            textstyleType: textstyleType
        });
    }
});

