
//background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "annotate",
        title: "Annotate",
        contexts: ["selection"]
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "annotate"){

        chrome.tabs.sendMessage(tab.id, {
            action: "highlight",
            color: "yellow"
        });

    }
});

