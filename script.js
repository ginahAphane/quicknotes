let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

const VALID_CATEGORIES = ["personal", "work", "study"];
const MAX_TEXT_LENGTH = 200;

// Normalise a string once, reuse everywhere
function normalise(str) {
  return str.trim().toLowerCase();
}

// Pluralise "note" based on a count
function noteWord(count) {
  return count === 1 ? "note" : "notes";
}

// 1. Search: case-insensitive substring match on note text
function searchNotes(word) {
  const needle = normalise(word);
  return notes.filter((note) => normalise(note.text).includes(needle));
}

// 2. Longest note: returns the note object with the most characters
function longestNote(list = notes) {
  if (list.length === 0) return null;

  return list.reduce((longest, current) =>
    current.text.length > longest.text.length ? current : longest
  );
}

// 3. Tally notes per category
function countByCategory() {
  return notes.reduce((tally, note) => {
    tally[note.category] = (tally[note.category] || 0) + 1;
    return tally;
  }, {});
}

// 4. Human-readable summary of the whole collection
function getSummary() {
  const tally = countByCategory();
  const total = notes.length;

  const breakdown = Object.keys(tally)
    .sort()
    .map((category) => `${tally[category]} ${category} ${noteWord(tally[category])}`)
    .join(", ");

  return `${total} ${noteWord(total)}: ${breakdown}.`;
}

// 5. Duplicate check against existing note text
function isDuplicate(text) {
  const target = normalise(text);
  return notes.some((note) => normalise(note.text) === target);
}

// 6. Generate the next available id
function nextId() {
  if (notes.length === 0) return 1;
  return Math.max(...notes.map((note) => note.id)) + 1;
}

// 7. Add a note with validation
function addNote(text, category) {
  if (typeof text !== "string") return false;

  const clean = text.trim();

  if (clean.length < 1 || clean.length > MAX_TEXT_LENGTH) return false;
  if (!VALID_CATEGORIES.includes(category)) return false;
  if (isDuplicate(clean)) return false;

  notes.push({ id: nextId(), text: clean, category });
  return true;
}

// ---- Tests ----
console.log("== searchNotes ==");
console.log(searchNotes("project"));   // one work note
console.log(searchNotes("milk"));      // one personal note
console.log(searchNotes("zzz"));       // []

console.log("== longestNote ==");
console.log(longestNote());            // the Grace email note
console.log(longestNote([]));          // null
console.log(longestNote([notes[0]]));  // the single note passed in

console.log("== countByCategory ==");
console.log(countByCategory());        // { personal: 2, study: 2, work: 1 }
console.log(countByCategory().study);  // 2

console.log("== getSummary ==");
console.log(getSummary());             // "5 notes: 2 personal notes, 2 study notes, 1 work note."
console.log(getSummary().startsWith("5")); // true

console.log("== isDuplicate ==");
console.log(isDuplicate("BUY MILK AND BREAD")); // true
console.log(isDuplicate("   call mum  "));      // true
console.log(isDuplicate("Something new"));      // false

console.log("== addNote ==");
console.log(addNote("Go for a jog", "personal")); // true
console.log(addNote("Go for a jog", "personal")); // false (duplicate)
console.log(addNote("", "personal"));             // false (empty)
console.log(addNote("x".repeat(201), "work"));    // false (too long)
console.log(addNote("Draft essay", "hobby"));     // false (bad category)
console.log(addNote("Review pull request", "work")); // true

console.log("== final notes ==");
console.log(notes);