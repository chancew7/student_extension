export const ActionType = {
    COMMENT: "comment",
    HIGHLIGHT: "highlight",
    TEXTSTYLE: "textstyle"
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
    DEFAULT: `#fcf766`
}

export const IdPreamble = {
    COMMENT: "comment_",
    HIGHLIGHT: "highlight_",
    TEXTSTYLE: "textstyle_"
}

export const CommandShortcuts = {
    HIGHLIGHT: "Ctrl+Shift+H",
    BOLD: "Ctrl+B",
    ITALIC: "Ctrl+I",
    UNDERLINE: "Ctrl+Shift+U"
}

const PreTitles = {
    HIGHLIGHT: "Highlight",
    BOLD: "Bold",
    ITALIC: "Italic",
    UNDERLINE: "Underline"
}

export const Titles = {
    HIGHLIGHT: PreTitles.HIGHLIGHT + " ".repeat(10) + CommandShortcuts.HIGHLIGHT,
    BOLD: PreTitles.BOLD + " ".repeat(31) + CommandShortcuts.BOLD,
    ITALIC: PreTitles.ITALIC + " ".repeat(31) +CommandShortcuts.ITALIC,
    UNDERLINE: PreTitles.UNDERLINE + " ".repeat(12) +CommandShortcuts.UNDERLINE
}
