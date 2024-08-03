

import { TextstyleType, ActionType, HighlightColors} from './constants.js';


//handle: the Range has partially selected a non-Text node


export class HighlightAnnotation {

    constructor(span, range, color = HighlightColors.YELLOW){
        this.span = span;
        this.range = range;
        this.color = color;
    }

    showHighlight(){
        this.span.style.backgroundColor = this.color;
        this.range.surroundContents(this.span);        
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

    showTextstyle(){

        switch(this.type){
            case TextstyleType.BOLD:
                this.showBold();
                break;
            case TextstyleType.UNDERLINE:
                this.showUnderline();
                break;
            case TextstyleType.ITALIC:
                this.showItalic();
                break;
        }
    }

    showBold(){
        this.span.style.fontWeight = 'bold';
        this.range.surroundContents(this.span);
    }
    showUnderline(){
        this.span.style.textDecoration = 'underline';
        this.range.surroundContents(this.span);
    }
    showItalic(){
        this.span.style.fontStyle = 'italic';
        this.range.surroundContents(this.span);
    }
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
            case "remove_highlight":
                let highlight_r = new HighlightAnnotation(span, range);
                highlight_r.removeHighlight();
                break;
        }
    }
});


