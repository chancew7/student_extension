

import * as constants from "../../constants.js";
import {Annotation} from './Annotation.js';

export class TextstyleAnnotation extends Annotation{
    constructor(span, range, type, markup_key){
        super(span, range, markup_key, constants.ActionType.TEXTSTYLE);
        this.type = type;
        this.textstyles = {
            bolded: false,
            italicized: false,
            underlined: false
        }
    }

    performAnnotation(){

        switch(this.type){
            case constants.TextstyleType.BOLD:
                if (!this.textstyles.bolded){
                    this.showBold();
                }
                else{
                    this.removeBold();
                }
                break;
            case constants.TextstyleType.UNDERLINE:
                if(!this.textstyles.underlined){
                    this.showUnderline();
                }
                else{
                    this.removeUnderline
                }
                break;
            case constants.TextstyleType.ITALIC:
                if(!this.textstyles.italicized){
                    this.showItalic();
                }
                else{
                    this.removeItalic();
                }
                break;
        }
    }
    addToMarkup(){}
    removeMarkup(){}

    showBold(){
        this.span.style.fontWeight = 'bold';
    }
    removeBold(){
        this.span.style.fontWeight = 'normal';
    }
    showUnderline(){
        this.span.style.textDecoration = 'underline';
    }
    removeUnderline(){
        this.span.style.textDecoration = 'none';
    }
    showItalic(){
        this.span.style.fontStyle = 'italic';
    }
    removeItalic(){
        this.span.style.fontStyle = 'normal';
    }
    
}