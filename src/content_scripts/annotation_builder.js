

import * as constants from "../constants.js";
import { Annotation } from './annotations/Annotation.js';
import { HighlightAnnotation } from "./annotations/HighlightAnnotation.js";
import { CommentAnnotation } from "./annotations/CommentAnnotation.js";
import { TextstyleAnnotation } from "./annotations/TextstyleAnnotation.js";
import * as annotation_messages from '../background_scripts/annotation_message.js';


import { db } from '../background_scripts/firebase-init.js';
import { collection, getDocs, query, where, getDoc, addDoc, doc, setDoc } from 'firebase/firestore';

var markupKey = null;
var url = null;


export function generateMarkupKey(){
    return 'markup_' + Math.random().toString(36).substring(2,11);
}

async function createMarkup(url){

    console.log("no existing markup, creating new");

    const markupKey = generateMarkupKey();

    let newMarkup = {
        url: url, 
        markup_key: markupKey, 
        annotations: []
    };

    const docRef = doc(db, 'markups', markupKey);
    await setDoc(docRef, newMarkup);
    console.log('New markup created with ID: ', docRef.id);

    return markupKey;
}

export function reimplementAnnotation(annotation){

    const { startOffset, endOffset, startXpath, endXpath } = annotation;
    
    const startElement = getElementByXpath(startXpath);
    const endElement = getElementByXpath(endXpath);

    const range = document.createRange();
    range.setStart(startElement, startOffset);
    range.setEnd(endElement, endOffset);


    const span = document.createElement('span');

    switch(annotation.type){
        case constants.ActionType.HIGHLIGHT:
            console.log("working");

            let highlight = new HighlightAnnotation(span, range, annotation.color, annotation.markup_key);
            highlight.performAnnotation();
            
    }

}

function getElementByXpath(path){
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}




chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {


    if (message.key === constants.MessageKeys.MARKUP_MESSAGE){ //an existing markup has been found, load and apply the annotations
        url = message.url;

        if (message.markup_key){
            markupKey = message.markup_key;


            try{
                const docRef = doc(db, 'markups', markupKey);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()){
                    const annotations = docSnap.data().annotations;
                    annotations.forEach(annotation => {
                        reimplementAnnotation(annotation);
                    });
                }
            }
            catch(error){
                console.error("db retrieval threw an error: ", error);
            }

        }
 
    }

    else if (message.key === constants.MessageKeys.ANNOTATION){

        if (markupKey == null){
            markupKey = await createMarkup(url);
        }

        const selection = window.getSelection();
        if (selection.rangeCount > 0){
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');

            switch(message.action){
                case constants.ActionType.COMMENT:
                    let comment = new CommentAnnotation(span, range, message.commentMessage, markupKey);
                    comment.performAnnotation()
                    break;
                case constants.ActionType.HIGHLIGHT:
                    //if annotation exists with matching range, get annotation, otherwise create annotation
                    let highlight = new HighlightAnnotation(span, range, message.highlightColor, markupKey);
                    highlight.performAnnotation();
                    break;
                case constants.ActionType.TEXTSTYLE:
                    //if matching textstyle exists, get. otherwise create
                    let textstyle = new TextstyleAnnotation(span, range, message.textstyleType, markupKey);
                    textstyle.performAnnotation();
                    break;
                case constants.ActionType.CLEAR:
                    let annotation = new Annotation(span, range, markupKey);
                    annotation.clearAll();
                    break;
            }
        }
    }

});




