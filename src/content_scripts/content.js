
//content.js

import * as bundle_reasons from './annotation_builder.js';
import * as constants from "../constants.js";

let ctrlShiftHPressed = false;
let timerId = null;

document.addEventListener('keydown', function(event){


    if(event.ctrlKey && event.shiftKey && event.code === 'KeyB'){
        event.preventDefault();
        chrome.runtime.sendMessage({action: constants.ActionType.TEXTSTYLE, textstyleType: constants.TextstyleType.BOLD, key: "cmd_shortcut"})
    }

    else if(event.ctrlKey && event.shiftKey && event.code === 'KeyU'){
        event.preventDefault();
        chrome.runtime.sendMessage({action: constants.ActionType.TEXTSTYLE, textstyleType: constants.TextstyleType.UNDERLINE, key: "cmd_shortcut"})
    }
    else if(event.ctrlKey && !event.shiftKey && event.code === 'KeyI'){
        chrome.runtime.sendMessage({action: constants.ActionType.TEXTSTYLE, textstyleType: constants.TextstyleType.ITALIC, key: "cmd_shortcut"})
    }
    else if (event.ctrlKey && event.shiftKey && event.code === 'KeyC'){
        event.preventDefault();
        chrome.runtime.sendMessage({action: constants.ActionType.COMMENT, key: "cmd_shortcut"})
    }
    else if (event.key === 'Delete'){
        chrome.runtime.sendMessage({action: constants.ActionType.CLEAR, key: "cmd_shortcut"})
    }
    else if (event.ctrlKey && event.shiftKey && event.code === 'KeyH'){
        chrome.runtime.sendMessage({action: constants.ActionType.HIGHLIGHT, color: constants.HighlightColors.DEFAULT, key: "cmd_shortcut"});

        if (timerId){clearTimeout(timerId);}
        ctrlShiftHPressed = true;

        timerId = setTimeout(() => {
            ctrlShiftHPressed = false;
            timerId = null;
        }, 2000);
    }
    //works but need to remove existing highlight first, i.e. recognize span is the same
    //adjust highlight color
    if (ctrlShiftHPressed && event.code === 'KeyY'){
        chrome.runtime.sendMessage({action: constants.ActionType.HIGHLIGHT, color: constants.HighlightColors.RED, key: "cmd_shortcut"});
        ctrlShiftHPressed = false;
        clearTimeout(timerId);
        timerId = null;
    }
    
});



