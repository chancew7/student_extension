

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
                    let highlight_test = new HighlightAnnotation(span, range, HighlightColors.RED);
                    highlight_test.showAnnotation();
                    let comment1 = new CommentAnnotation(span, range, message.commentMessage);
                    comment1.showAnnotation()
                    break;
                case ActionType.HIGHLIGHT:
                    let highlight = new HighlightAnnotation(span, range, message.highlightColor);
                    highlight.showAnnotation();
                    break;
                case ActionType.TEXTSTYLE:
                    let textstyle = new TextstyleAnnotation(span, range, message.textstyleType);
                    textstyle.showAnnotation();
                    break;
                case "remove_highlight":
                    let highlight_r = new HighlightAnnotation(span, range);
                    highlight_r.removeAnnotation();
                    break;
            }
        }
    }

});


