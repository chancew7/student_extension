
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
    location;
    constructor(span, range, message = "def mess"){
        super();
        this.span = span;
        this.range = range;
        this.message = message;
    }
    createDefaultComment(){
        const commentBox = document.createElement('textarea');
        commentBox.placeholder = this.message;
        commentBox.style.position = 'fixed';
        commentBox.style.top = '50px'; // Position it appropriately
        commentBox.style.right = '50px'; // Adjust as needed
        commentBox.style.width = '300px';
        commentBox.style.height = '150px';
        commentBox.style.zIndex = '1000'; // Ensure it is on top of other elements
        commentBox.style.backgroundColor = '#fff';
        commentBox.style.border = '2px solid #ccc';
        commentBox.style.padding = '10px';
        commentBox.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
      
        document.body.appendChild(commentBox);
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