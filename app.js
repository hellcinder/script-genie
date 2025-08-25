
document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementById("editor");
  const preview = document.getElementById("preview");

  function updatePreview() {
    const lines = editor.value.split("\n");
    preview.innerHTML = lines.map(line => {
      if (line.startsWith("INT.") || line.startsWith("EXT.")) {
        return `<b>Scene:</b> ${line}`;
      } else if (line === line.toUpperCase() && line.split(" ").length <= 3) {
        return `<b>CHARACTER:</b> ${line}`;
      } else if (line.startsWith("(") && line.endsWith(")")) {
        return `<i>${line}</i>`;
      } else {
        return line;
      }
    }).join("<br>");
  }

  editor.addEventListener("input", updatePreview);

  window.insertSceneHeading = () => {
    insertText("EXT. LOCATION - DAY\n");
  };

  window.insertCharacter = () => {
    insertText("CHARACTER NAME\n");
  };

  window.insertAction = () => {
    insertText("Action description here.\n");
  };

  window.insertDialogue = () => {
    insertText("CHARACTER NAME\nDialogue goes here.\n");
  };

  window.insertTitlePage = () => {
    insertText("TITLE\n\nby John Donham\n\nContact: your.email@example.com\n");
  };

  function insertText(text) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.setRangeText(text, start, end, 'end');
    updatePreview();
  }

  window.toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  window.exportPDF = () => {
    alert("PDF export is not available in the browser-only version.");
  };

  updatePreview();
});
