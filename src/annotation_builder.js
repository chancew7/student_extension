

import { TextstyleType, ActionType, HighlightColors} from './constants.js';
import { Annotation, HighlightAnnotation, CommentAnnotation, TextstyleAnnotation} from './annotation_types.js'


//handle: the Range has partially selected a non-Text node



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.key == 'annotate'){

        const selection = window.getSelection();
        if (selection.rangeCount > 0){
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');

            switch(message.action){
                case ActionType.COMMENT:
                    let comment1 = new CommentAnnotation(span, range, message.commentMessage);
                    comment1.showAnnotation()
                    break;
                case ActionType.HIGHLIGHT:
                    //if annotation exists with matching range, get annotation, otherwise create annotation
                    let highlight = new HighlightAnnotation(span, range, message.highlightColor);
                    highlight.performAnnotation();
                    break;
                case ActionType.TEXTSTYLE:
                    //if matching textstyle exists, get. otherwise create
                    let textstyle = new TextstyleAnnotation(span, range, message.textstyleType);
                    textstyle.performAnnotation();
                    break;
                case "remove_highlight":
                    //span = default
                    //delete span, range or something, idk
                    //also delete from database
                    //check if any annotations are left on specified range. if not, clear from database
                    break;
            }
        }
    }

});


