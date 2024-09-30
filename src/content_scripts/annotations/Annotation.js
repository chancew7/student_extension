

import * as constants from "../../constants.js";

export class Annotation{
    constructor(span, range, markup_key, annotationType){
        this.markup_key = markup_key;
        this.span = span;
        this.range = range;
        this.annotationType = annotationType;
        this.range.surroundContents(this.span);
        this.startXpath = this.getUniqueXPath(this.range.startContainer);
        this.endXpath = this.getUniqueXPath(this.range.endContainer);
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
        return `${this.markup_key}-${this.annotationType}-${this.startXpath}-${this.endXpath}`;
    }
    
    getXPathForElement(element) {
        const idx = (sib, name) => sib 
            ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
            : 1;
        const segs = el => !el || el.nodeType !== 1 
            ? ['']
            : el.id && document.getElementById(el.id) === el
                ? [`id("${el.id}")`]
                : [...segs(el.parentNode), `${el.localName.toLowerCase()}[${idx(el)}]`];
        return segs(element).join('/');
    }

    getUniqueXPath(element) {
        if (element.id !== "") {
            return '//*[@id="' + element.id + '"]';
        }
        if (element === document.body) {
            return '/html/body';
        }
        let ix = 0;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                return this.getUniqueXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }
    


}