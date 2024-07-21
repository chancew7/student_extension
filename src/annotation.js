

import { TextstyleType, ActionType} from './constants.js';

export class HighlightAnnotation {

    constructor(span, range, color){
        console.log
        this.span = span;
        this.range = range;
        this.color = color;
    }

    showHighlight(){
        this.span.style.backgroundColor = this.color;
        this.range.surroundContents(this.span);        //need to place into a try...catch for Error: Failed to execute 'surroundContents' on 'Range': The Range has partially selected a non-Text node
    }
    removeHighlight(){

    }
    
}

export class CommentAnnotation{
    location;
    constructor(span, range, message){
        this.span = span;
        this.range = range;
        this.message = message;
    }
    setDefaultLocation(){
    }
    changeLocation(){
    }
    showComment(){
    }
    removeComment(){
    }
}

export class TextstyleAnnotation{
    constructor(span, range, type){
        this.span = span;
        this.range = range;
        this.type = type;
    }
    showTextstyle(){}
    removeTextstyle(){}
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {


    const selection = window.getSelection();
    if (selection.rangeCount > 0){
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
    

        switch(message.action){
            case ActionType.COMMENT:
                let comment = new CommentAnnotation(span, range, message.commentMessage);
                comment.setDefaultLocation();
                comment.showComment();
                break;
            case ActionType.HIGHLIGHT:
                let highlight = new HighlightAnnotation(span, range, message.highlightColor);
                highlight.showHighlight();
                break;
            case ActionType.TEXTSTYLE:
                let textstyle = new TextstyleAnnotation(span, range, message.textstyleType);
                textstyle.showTextstyle();
                break;
        }
    }
});








