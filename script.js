const searchInput = document.querySelector("#search-input");
const STORAGE_KEY = "quicknotes.notes";
// ---------- Element references ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// ---------- State ----------
let notes = [];
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function getVisibleNotes() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return notes;
  const words = query.split(/\s+/);
  return notes.filter((note) => {
    const text = note.text.toLowerCase();
    return words.every((w) => text.includes(w));
  });
}
// ---------- Helpers ----------
function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
searchInput.addEventListener("input", render);
// ---------- Render ----------
function render() {
  notesList.textContent = "";

  const visible = getVisibleNotes();

  if (visible.length === 0 && searchInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.className = "note-card";
    li.textContent = "No notes match your search.";
    notesList.appendChild(li);
    updateCount();
    return;
  }

  for (const note of visible) {
    // ...same card-building code as before...
  }

  updateCount();
}

function updateCount() {
  const n = notes.length;
  if (n === 0) noteCount.textContent = "You have no notes yet.";
  else if (n === 1) noteCount.textContent = "You have 1 note.";
  else noteCount.textContent = `You have ${n} notes.`;
}

// ---------- Add note ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (!text) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  notes.push({
    id: Date.now(),
    text,
    category,
    createdAt: new Date().toISOString(),
  });

  noteInput.value = "";
  render();
});

// ---------- Delete note ----------
notesList.addEventListener("click", (event) => {
  const btn = event.target.closest(".delete-btn");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  notes = notes.filter((note) => note.id !== id);
 notes = loadNotes();
render();
});