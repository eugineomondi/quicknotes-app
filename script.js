// ---------- Element references ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// ---------- State ----------
let notes = [];

// ---------- Helpers ----------
function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// ---------- Render ----------
function render() {
  notesList.textContent = "";

  for (const note of notes) {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category}`;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const category = document.createElement("span");
    category.className = "note-category";
    category.textContent = note.category;

    const date = document.createElement("span");
    date.className = "note-date";
    date.textContent = formatDate(note.createdAt);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = note.id;

    meta.appendChild(category);
    meta.appendChild(date);
    li.appendChild(text);
    li.appendChild(meta);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
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

  if (!text) return;

  notes.push({
    id: Date.now(),
    text,
    category,
    createdAt: new Date().toISOString(),
  });

  noteInput.value = "";
  render();
});

// ---------- Boot ----------
render();