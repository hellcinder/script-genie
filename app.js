const input = document.getElementById("script-input");
const preview = document.getElementById("script-preview");

input.addEventListener("input", () => {
  const lines = input.value.split("\n");
  const output = lines.map(line => {
    const trimmed = line.trim();
    if (/^(INT\.|EXT\.|EST\.|INT\/EXT\.)/.test(trimmed)) {
      return "\nScene: " + trimmed;
    } else if (trimmed === trimmed.toUpperCase() && trimmed.split(" ").length < 4) {
      return "\nCHARACTER: " + trimmed;
    } else if (/^\(.*\)$/.test(trimmed)) {
      return "\n    (" + trimmed.slice(1, -1) + ")";
    } else if (["FADE OUT.", "FADE IN:", "DISSOLVE TO:", "SMASH CUT:", "CUT TO:", "MATCH CUT:"].includes(trimmed)) {
      return "\n     >> " + trimmed + " <<";
    } else {
      return "\n" + trimmed;
    }
  });
  preview.textContent = output.join("");
});

// Export to PDF
function exportPDF() {
  const element = document.getElementById("script-preview");
  html2pdf().from(element).save("script.pdf");
}

// Sprint Timer
let sprintInterval;
function startSprint() {
  clearInterval(sprintInterval);
  let minutes = parseInt(document.getElementById("sprint-duration").value || "5");
  let seconds = minutes * 60;
  const timerDisplay = document.getElementById("sprint-timer");

  sprintInterval = setInterval(() => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    timerDisplay.textContent = `${min}:${sec < 10 ? "0" : ""}${sec}`;
    if (--seconds < 0) {
      clearInterval(sprintInterval);
      timerDisplay.textContent = "⏰ Sprint done!";
      alert("Time's up!");
    }
  }, 1000);
}
