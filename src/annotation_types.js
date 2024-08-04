
import { TextstyleType, ActionType, HighlightColors} from './constants.js';


export class Annotation{
    constructor(){
    }
    showAnnotation(){}
    removeAnnotation(){}
    addToMarkup(){}
}


export class HighlightAnnotation extends Annotation{

    constructor(span, range, color = HighlightColors.YELLOW){
        super();
        this.span = span;
        this.range = range;
        this.color = color;
    }

    showAnnotation(){
        this.span.style.backgroundColor = this.color;
        this.range.surroundContents(this.span);        
    }

    removAnnotation(){
 
    }
    
}

export class CommentAnnotation extends Annotation{
    location;
    constructor(span, range, message){
        super();
        this.span = span;
        this.range = range;
        this.message = message;
    }
    setDefaultLocation(){
    }
    changeLocation(){
    }
    showAnnotation(){
    }
    removeAnnotation(){
    }
}

export class TextstyleAnnotation extends Annotation{
    constructor(span, range, type){
        super();
        this.span = span;
        this.range = range;
        this.type = type;
    }

    showAnnotation(){

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
    removeAnnotation(){}
}