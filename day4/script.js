const textarea = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

function updateCounts(){
  const text = textarea.value;
  const chars = text.length;
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  charCount.textContent = `${chars} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");
  if(chars > 200){
    charCount.classList.add("over");
  } else if(chars > 180){
    charCount.classList.add("warning");
  }

  localStorage.setItem("draft", text);
}

function clearAll(){
  textarea.value = "";
  localStorage.removeItem("draft");
  updateCounts();
}

// Load saved draft and theme
window.addEventListener("DOMContentLoaded", () => {
  const savedDraft = localStorage.getItem("draft");
  if(savedDraft){
    textarea.value = savedDraft;
  }

  const savedTheme = localStorage.getItem("theme");
  if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  }

  updateCounts();
});

textarea.addEventListener("input", updateCounts);

clearBtn.addEventListener("click", clearAll);

textarea.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    clearAll();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  
  if(isDark){
    themeToggle.textContent = "Light mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "Dark mode";
    localStorage.setItem("theme", "light");
  }
});