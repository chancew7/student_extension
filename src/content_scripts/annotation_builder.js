

import * as constants from "../constants.js";
import * as annotation_types from './annotation_types.js';



//handle: the Range has partially selected a non-Text node



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    console.log("annotation builder heard message");

    if (message.key == 'annotate'){

        const selection = window.getSelection();
        if (selection.rangeCount > 0){
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');

            switch(message.action){
                case constants.ActionType.COMMENT:
                    let comment = new annotation_types.CommentAnnotation(span, range, message.commentMessage);
                    comment.showAnnotation()
                    break;
                case constants.ActionType.HIGHLIGHT:
                    //if annotation exists with matching range, get annotation, otherwise create annotation
                    let highlight = new annotation_types.HighlightAnnotation(span, range, message.highlightColor);
                    highlight.performAnnotation();
                    break;
                case constants.ActionType.TEXTSTYLE:
                    //if matching textstyle exists, get. otherwise create
                    console.log("trying to create textstyle");
                    let textstyle = new annotation_types.TextstyleAnnotation(span, range, message.textstyleType);
                    textstyle.performAnnotation();
                    break;
                case constants.ActionType.CLEAR:
                    let annotation = new annotation_types.Annotation(span, range);
                    annotation.clearAll();
                    break;
            }
        }
    }

});


