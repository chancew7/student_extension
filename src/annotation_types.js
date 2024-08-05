
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

    removeAnnotation(){
 
    }
    
}

export class CommentAnnotation extends Annotation{
    constructor(span, range, message = "default message"){
        super();
        this.span = span;
        this.range = range;
        this.message = message;
        this.commentBox = document.createElement('textarea')
    }

    showAnnotation(){
        this.commentBox.placeholder = this.message;
        this.setDefaultProperties();
        this.setDefaultLocation();
        document.body.appendChild(this.commentBox);
    }

    setDefaultLocation(){
        if (this.range && this.range.getBoundingClientRect){
            const rect = this.range.getBoundingClientRect();
            const topPosition = rect.top + window.scrollY - parseInt(this.commentBox.style.height);
            this.commentBox.style.top = `${topPosition}px`;
            this.commentBox.style.right = `20px`;
        }
    }
    setDefaultProperties(){
        this.commentBox.style.position = 'absolute';
        this.commentBox.style.width = '300px';
        this.commentBox.style.height = '150px';
        this.commentBox.style.zIndex = '1000';
        this.commentBox.style.backgroundColor = '#fff';
        this.commentBox.style.border = '2px solid #ccc';
        this.commentBox.style.padding = '10px';
        this.commentBox.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
    }
    changeLocation(rightDistance, downDistance){
        this.commentBox.right = rightDistance;
        this.commentBox.top = downDistance;
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