
//content.js


import { Car } from './car';

function highlightSelectedText(color){
    const selection = window.getSelection();
        if (selection.rangeCount > 0){
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.style.backgroundColor = color;
            range.surroundContents(span);
            console.log("highlighted text turned " + color);
        }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "highlight"){
        highlightSelectedText(message.color);
    }
});
