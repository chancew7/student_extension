

import * as constants from "../../constants.js";
import {Annotation} from './Annotation.js';


export class HighlightAnnotation extends Annotation{

    constructor(span, range, color = HighlightColors.DEFAULT, markup_key){
        super(span, range, markup_key, constants.ActionType.HIGHLIGHT);
        this.color = color;
        this.highlighted = false;
        
    }
    performAnnotation(){
        if (!this.highlighted){
            this.showAnnotation();
        }
        else{
            this.removeAnnotation();
        }
        this.addToMarkup();
    }
    addToMarkup(){

        const annotationData = this.toJson();
        
        chrome.runtime.sendMessage({
            key: constants.MessageKeys.SAVE_ANNOTATION,
            annotation: annotationData
        });
        
    }
    removeAnnotation(){
        this.span.style.backgroundColor = constants.HighlightColors.TRANSPARENT;
        this.highlighted = false;
    }
    toJson(){

        return {
            id: super.generateAnnotationId(),
            type: this.annotationType,
            startOffset: this.range.startOffset,
            endOffset: this.range.endOffset,
            text: this.range.toString(),
            markup_key: this.markup_key,
            color: this.color,
        }
    }
    showAnnotation(){
        this.span.style.backgroundColor = this.color;
        this.highlighted = true;      
    }

    
}