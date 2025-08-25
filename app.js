const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

editor.addEventListener("input", updatePreview);
updatePreview();

function updatePreview() {
  const lines = editor.value.split("\n");
  let result = "";
  lines.forEach(line => {
    let stripped = line.trim();
    if (/^(INT\.|EXT\.)/.test(stripped)) {
      result += `\nScene: ${stripped}`;
    } else if (/^[A-Z ]+$/.test(stripped) && stripped.length < 30) {
      result += `\nCHARACTER: ${stripped}`;
    } else if (stripped.startsWith("(") && stripped.endsWith(")")) {
      result += `\n    ${stripped}`;
    } else {
      result += `\n${stripped}`;
    }
  });
  preview.textContent = result;
}

function insertSceneHeading() {
  const type = document.getElementById("scene-type").value;
  const location = document.getElementById("location").value || "LOCATION";
  const time = document.getElementById("time-of-day").value;
  const heading = `${type} ${location.toUpperCase()} – ${time}\n`;
  insertAtCursor(heading);
}

function insertSnippet(type) {
  let snippet = "";
  switch (type) {
    case "CHARACTER":
      snippet = "\nCHARACTER NAME\n";
      break;
    case "ACTION":
      snippet = "\n(Action goes here)\n";
      break;
    case "DIALOGUE":
      snippet = "\nCHARACTER NAME\n    Dialogue line here.\n";
      break;
  }
  insertAtCursor(snippet);
}

function insertAtCursor(text) {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const before = editor.value.substring(0, start);
  const after = editor.value.substring(end);
  editor.value = before + text + after;
  editor.selectionStart = editor.selectionEnd = start + text.length;
  editor.focus();
  updatePreview();
}

function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter"
  });

  doc.setFont("Courier", "normal");
  doc.setFontSize(12);
  const lines = editor.value.split("\n");
  let y = 72; // 1 inch top
  const leftMargin = 108; // 1.5 inch left
  const lineHeight = 16;

  lines.forEach((line, i) => {
    if (y > 750) {
      doc.addPage();
      y = 72;
    }
    doc.text(line, leftMargin, y);
    y += lineHeight;
  });

  doc.save("script_genie.pdf");
}