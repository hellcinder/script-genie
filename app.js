
document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("editor");

    document.getElementById("sceneBtn").addEventListener("click", function () {
        insertAtCursor("INT./EXT. LOCATION - TIME\n");
    });

    document.getElementById("characterBtn").addEventListener("click", function () {
        insertAtCursor("\nCHARACTER NAME\n");
    });

    document.getElementById("locationBtn").addEventListener("click", function () {
        insertAtCursor("\nLocation: \n");
    });

    document.getElementById("introBtn").addEventListener("click", function () {
        insertAtCursor("\nINTRO: \n");
    });

    function insertAtCursor(text) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const before = editor.value.substring(0, start);
        const after = editor.value.substring(end, editor.value.length);
        editor.value = before + text + after;
        editor.selectionStart = editor.selectionEnd = start + text.length;
        editor.focus();
    }
});
