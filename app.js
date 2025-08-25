document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const insertTitle = document.getElementById("insertTitle");
    const editor = document.getElementById("editor");

    // Theme toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

    // Restore theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    // Insert Title Page
    insertTitle.addEventListener("click", () => {
        const titlePage = `


        
        
        
        
        
        
        TITLE OF SCREENPLAY

        Written by
        John Donham







                                                 John Donham
                                            john@example.com`;
        editor.value = titlePage + "\n\n" + editor.value;
    });
});