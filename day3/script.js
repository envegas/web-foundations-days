let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" }
];

// Search notes by text, ignoring case
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter(note =>
    note.text.toLowerCase().includes(searchWord)
  );
}

console.log(searchNotes("javascript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("python"));
// Expected: []


// Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }

  return longest;
}

console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

const originalNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = originalNotes;


// Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}

console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

notes = [];
console.log(countByCategory());
// Expected: {}
notes = originalNotes;


// Get a summary of the notes
function getSummary() {
  const counts = countByCategory();
  const noteWord = notes.length === 1 ? "note" : "notes";

  return `${notes.length} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

console.log(getSummary());
// Expected: 5 notes: 2 personal, 1 work, 2 study.

notes = [
  { id: 1, text: "Call mum", category: "personal" }
];

console.log(getSummary());
// Expected: 1 note: 1 personal, 0 work, 0 study.

notes = originalNotes;


// Check whether a note is a duplicate
function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === normalizedText
  );
}

console.log(isDuplicate("  CALL MUM  "));
// Expected: true

console.log(isDuplicate("Go to the gym"));
// Expected: false


// Add a new note
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];

  if (typeof text !== "string") {
    console.log("Note was not added: text must be a string.");
    return false;
  }

  const trimmedText = text.trim();

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note was not added: text must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Note was not added: duplicate note.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Note was not added: invalid category.");
    return false;
  }

  const newId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  notes.push({
    id: newId,
    text: trimmedText,
    category: category
  });

  console.log("Note added successfully.");
  return true;
}

console.log(addNote("Prepare for the JavaScript test", "study"));
// Expected: true

console.log(addNote("  call MUM  ", "personal"));
// Expected: false, duplicate note

console.log(addNote("", "personal"));
// Expected: false, invalid length

console.log(addNote("Learn CSS", "invalid"));
// Expected: false, invalid category