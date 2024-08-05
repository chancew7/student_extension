
import { TextstyleType, ActionType, HighlightColors} from './constants.js';


export class Annotation{
    constructor(){
    }
    performAnnotation(){}
    addToMarkup(){}
}


export class HighlightAnnotation extends Annotation{

    constructor(span, range, color = HighlightColors.DEFAULT){
        super();
        this.span = span;
        this.range = range;
        this.color = color;
        this.highlighted = false;
        this.range.surroundContents(this.span);
    }
    performAnnotation(){
        if (!this.highlighted){
            this.showAnnotation();
        }
        else{
            this.removeAnnotation();
        }
    }
    showAnnotation(){
        this.span.style.backgroundColor = this.color;
        this.highlighted = true;      
    }

    removeAnnotation(){
        this.span.style.backgroundColor = HighlightColors.TRANSPARENT;
        this.highlighted = false;
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
        this.enableDragging(this.commentBox);

        this.span.style.backgroundColor = HighlightColors.TRANSPARENT; 
        this.range.surroundContents(this.span); 
        this.addFocusListeners();
        document.body.appendChild(this.commentBox);
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
    setDefaultLocation(){
        if (this.range && this.range.getBoundingClientRect){
            const rect = this.range.getBoundingClientRect();
            const topPosition = rect.top + window.scrollY - parseInt(this.commentBox.style.height);
            this.commentBox.style.top = `${topPosition}px`;
            this.commentBox.style.right = `20px`;
        }
    }
    changeLocation(rightDistance, downDistance){
        this.commentBox.style.right = rightDistance;
        this.commentBox.style.top = downDistance;
    }


    enableDragging(element){
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.clientX - element.getBoundingClientRect().left;
            offsetY = event.clientY - parseFloat(element.style.top);

            const onMouseMove = (moveEvent) => {
                if (isDragging){
                    element.style.left = moveEvent.clientX - offsetX + 'px';
                    element.style.top = moveEvent.clientY - offsetY + 'px';
                }
            };
            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }


    addFocusListeners() {
        this.commentBox.addEventListener('focus', () => {
            this.span.style.backgroundColor = HighlightColors.COMMENT_COLOR; // Highlight color
        
            const onKeyDown = (event) => {
                if (event.key === 'Backspace' || event.key === 'Delete') {
                    console.log("deletion attempted");
                    this.removeAnnotation();
                }
            };
        
            this.commentBox.addEventListener('keydown', onKeyDown);

            this.commentBox.addEventListener('blur', () => {
                this.span.style.backgroundColor = 'transparent';
                this.commentBox.removeEventListener('keydown', onKeyDown);
            });
        });
    }

    removeAnnotation(){
        this.commentBox.parentNode.removeChild(this.commentBox);
        this.commentBox = null;
    }
}

export class TextstyleAnnotation extends Annotation{
    constructor(span, range, type){
        super();
        this.span = span;
        this.range = range;
        this.type = type;
        this.textstyles = {
            bolded: false,
            italicized: false,
            underlined: false
        }
        this.range.surroundContents(this.span);
    }

    performAnnotation(){

        switch(this.type){
            case TextstyleType.BOLD:
                if (!this.textstyles.bolded){
                    this.showBold();
                }
                else{
                    this.removeBold();
                }
                break;
            case TextstyleType.UNDERLINE:
                if(!this.textstyles.underlined){
                    this.showUnderline();
                }
                else{
                    this.removeUnderline
                }
                break;
            case TextstyleType.ITALIC:
                if(!this.textstyles.italicized){
                    this.showItalic();
                }
                else{
                    this.removeItalic();
                }
                break;
        }
    }

    showBold(){
        this.span.style.fontWeight = 'bold';
    }
    removeBold(){

    }
    showUnderline(){
        this.span.style.textDecoration = 'underline';
    }
    removeUnderline(){

    }
    showItalic(){
        this.span.style.fontStyle = 'italic';
    }
    removeItalic(){

    }
    
}