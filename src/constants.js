export const ActionType = {
    COMMENT: "comment",
    HIGHLIGHT: "highlight",
    TEXTSTYLE: "textstyle",
    CLEAR: "clear",
    LOAD_MARKUP: "load_markup"
}

export const MessageKeys = {
    KEY_COMMAND: 'cmd_shortcut', 
    ANNOTATION: 'annotate',
    MARKUP_MESSAGE: 'markup_message',
    SAVE_ANNOTATION: 'save_annotation'
}

export const TextstyleType = {
    BOLD: "bold",
    UNDERLINE: "underline",
    ITALIC: "italic"
}

export const HighlightColors = {
    YELLOW: `#fcf766`,
    BLUE: `#66fcf3`,
    GREEN: `#60da57`,
    RED: `#E55A5A`,
    COMMENT_COLOR: `#FdF8C6`,
    DEFAULT: `#fcf766`,
    TRANSPARENT: '#FFFFFF'
}

export const IdPreamble = {
    COMMENT: "comment_",
    HIGHLIGHT: "highlight_",
    TEXTSTYLE: "textstyle_"
}

export const CommandShortcuts = {
    HIGHLIGHT: "Ctrl+Shift+H",
    BOLD: "Ctrl+Shift+B",
    ITALIC: "Ctrl+I",
    UNDERLINE: "Ctrl+Shift+U"
}

const PreTitles = {
    HIGHLIGHT: "Highlight",
    BOLD: "Bold",
    ITALIC: "Italic",
    UNDERLINE: "Underline",
    COMMENT: "Comment"
}

export const Titles = {
    HIGHLIGHT: PreTitles.HIGHLIGHT + " ".repeat(10) + CommandShortcuts.HIGHLIGHT,
    BOLD: PreTitles.BOLD + " ".repeat(31) + CommandShortcuts.BOLD,
    ITALIC: PreTitles.ITALIC + " ".repeat(31) +CommandShortcuts.ITALIC,
    UNDERLINE: PreTitles.UNDERLINE + " ".repeat(25) +CommandShortcuts.UNDERLINE,
    COMMENT: PreTitles.COMMENT + " ".repeat(15)
}
