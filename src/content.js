
//content.js

import { HighlightAnnotation, CommentAnnotation, TextstyleAnnotation } from './annotation_builder.js';
import {ActionType, HighlightColors} from './constants.js'

let ctrlShiftHPressed = false;
let timerId = null;

document.addEventListener('keydown', function(event){

    
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyH'){
        chrome.runtime.sendMessage({action: ActionType.HIGHLIGHT, color: HighlightColors.DEFAULT, key: "cmd_shortcut"});

        if (timerId){clearTimeout(timerId);}
        ctrlShiftHPressed = true;

        timerId = setTimeout(() => {
            ctrlShiftHPressed = false;
            timerId = null;
        }, 2000);
    }

    //works but need to remove existing highlight first
    if (ctrlShiftHPressed && event.code === 'KeyY'){
        chrome.runtime.sendMessage({action: ActionType.HIGHLIGHT, color: HighlightColors.RED, key: "cmd_shortcut"});
        ctrlShiftHPressed = false;
        clearTimeout(timerId);
        timerId = null;
    }
    


});



