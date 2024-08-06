
//background.js

import * as constants from "../constants.js";
import * as annotation_messages from './annotation_message.js';

import { db } from './firebase-init.js';
import { collection, addDoc } from 'firebase/firestore';


//context menu buttons 
chrome.runtime.onInstalled.addListener(() => {


    chrome.contextMenus.create({
        id: constants.ActionType.HIGHLIGHT,
        title: constants.Titles.HIGHLIGHT,
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.HIGHLIGHT + constants.HighlightColors.BLUE,
        title: "Blue",
        parentId: constants.ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.HIGHLIGHT + constants.HighlightColors.GREEN,
        title: "Green",
        parentId: constants.ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.HIGHLIGHT + constants.HighlightColors.RED,
        title: "Red",
        parentId: constants.ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.HIGHLIGHT + constants.HighlightColors.TRANSPARENT,
        title: "cleer",
        parentId: constants.ActionType.HIGHLIGHT,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.HIGHLIGHT + constants.HighlightColors.YELLOW,
        title: "Yellow" + " ".repeat(8) + constants.CommandShortcuts.HIGHLIGHT,
        parentId: constants.ActionType.HIGHLIGHT,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: constants.ActionType.TEXTSTYLE,
        title: "Textstyle",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.TEXTSTYLE + constants.TextstyleType.BOLD,
        title: constants.Titles.BOLD,
        parentId: constants.ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.TEXTSTYLE + constants.TextstyleType.ITALIC,
        title: constants.Titles.ITALIC,
        parentId: constants.ActionType.TEXTSTYLE,
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        id: constants.IdPreamble.TEXTSTYLE + constants.TextstyleType.UNDERLINE,
        title: constants.Titles.UNDERLINE,
        parentId: constants.ActionType.TEXTSTYLE,
        contexts:["selection"]
    });


    chrome.contextMenus.create({
        id: constants.ActionType.COMMENT,
        title: constants.Titles.COMMENT,
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


//context menu listeners
chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.parentMenuItemId === constants.ActionType.HIGHLIGHT){ 
        let color = getHighlightColor(info.menuItemId);
        annotation_messages.sendHighlightMessage(color, tab);
    }
    else if (info.parentMenuItemId === constants.ActionType.TEXTSTYLE){
        let textstyleType = annotation_messages.getTextstyleType(info.menuItemId);
        annotation_messages.sendTextstyleMessage(textstyleType, tab)
    }
    else if (info.menuItemId === constants.ActionType.COMMENT){
        annotation_messages.sendCommentMessage(tab);
    }
    else if (info.parentMenuItemId === "remove_button"){
        chrome.tabs.sendMessage(tab.id, {
            action: "remove_highlight",
        });
    }
});
//key command listeners
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

    if (message.key === 'cmd_shortcut'){
        chrome.tabs.query({active: true, currentWindow: true }, function (tabs){
            if (tabs.length > 0){
                const tab = tabs[0];

                switch(message.action){
                    case constants.ActionType.HIGHLIGHT:
                        annotation_messages.sendHighlightMessage(message.color, tab);
                        break;
                    case constants.ActionType.TEXTSTYLE:
                        annotation_messages.sendTextstyleMessage(constants.TextstyleType[message.textstyleType.toUpperCase()], tab);
                        break;
                    case constants.ActionType.COMMENT:
                        annotation_messages.sendCommentMessage(tab);
                        break;
                    case constants.ActionType.CLEAR:
                        annotation_messages.sendClearMessage(tab);
                        break;
                }

            }
        });
    }
});




