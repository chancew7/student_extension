
//content.js

import { HighlightAnnotation, CommentAnnotation, TextstyleAnnotation } from './annotation_builder.js';
import {ActionType, HighlightColors, TextstyleType} from './constants.js'

let ctrlShiftHPressed = false;
let timerId = null;

document.addEventListener('keydown', function(event){


    if(event.ctrlKey && event.shiftKey && event.code === 'KeyB'){
        event.preventDefault();
        chrome.runtime.sendMessage({action: ActionType.TEXTSTYLE, textstyleType: TextstyleType.BOLD, key: "cmd_shortcut"})
    }
    else if(event.ctrlKey && event.shiftKey && event.code === 'KeyU'){
        event.preventDefault();
        chrome.runtime.sendMessage({action: ActionType.TEXTSTYLE, textstyleType: TextstyleType.UNDERLINE, key: "cmd_shortcut"})
    }
    else if(event.ctrlKey && event.code === 'KeyI'){
        chrome.runtime.sendMessage({action: ActionType.TEXTSTYLE, textstyleType: TextstyleType.ITALIC, key: "cmd_shortcut"})
    }
    
    else if (event.ctrlKey && event.shiftKey && event.code === 'KeyH'){
        chrome.runtime.sendMessage({action: ActionType.HIGHLIGHT, color: HighlightColors.DEFAULT, key: "cmd_shortcut"});

        if (timerId){clearTimeout(timerId);}
        ctrlShiftHPressed = true;

        timerId = setTimeout(() => {
            ctrlShiftHPressed = false;
            timerId = null;
        }, 2000);
    }
    //works but need to remove existing highlight first
    //adjust highlight color
    if (ctrlShiftHPressed && event.code === 'KeyY'){
        chrome.runtime.sendMessage({action: ActionType.HIGHLIGHT, color: HighlightColors.RED, key: "cmd_shortcut"});
        ctrlShiftHPressed = false;
        clearTimeout(timerId);
        timerId = null;
    }
    


});



