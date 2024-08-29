

import * as constants from "../../constants.js";

export class Annotation{
    constructor(span, range, markup_key, annotationType){
        this.markup_key = markup_key;
        this.span = span;
        this.range = range;
        this.annotationType = annotationType;
        this.range.surroundContents(this.span);
    }
    performAnnotation(){}
    addToMarkup(){}
    removeAnnotation(){}
    toJson(){}
    clearAll(){
        this.span.style.backgroundColor = constants.HighlightColors.TRANSPARENT;
        this.span.style.fontStyle = 'normal';
        this.span.style.textDecoration = 'none';
        this.span.style.fontWeight = 'normal';
    }
    generateAnnotationId(){
        return `${this.markup_key}-${this.annotationType}-${this.range.startOffset}-${this.range.endOffset}`;
    }
}