export const copyText = (value) => {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", value);
    } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
    ) {
        var textarea = document.createElement("textarea");
        textarea.textContent = value;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", value);
        } finally {
            document.body.removeChild(textarea);
            alert("The value is Copied.");
        }
    }
};

export const setLocal = (params) => {
    localStorage.setItem(params.name, params.value);
    return true;
};

export const getLocal = (name) => {
    const result = localStorage.getItem(name);
    return result;
};

export const clearLocal = () => {
    localStorage.clear();
    return true;
};

export const toLowerCase = (str) => {
    if (typeof str === "string") {
        return str.toLowerCase();
    }
    return str;
};
