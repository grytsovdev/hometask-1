import {
  addNote,
  archiveNote,
  archivedNotes,
  deleteAllNotes,
  deleteNote,
  editNote,
  notes,
  unarchiveNote,
} from "./NotesData";
const notesContainer = document.querySelector(".notes-container");
const modalContainer = document.querySelector(".modal-container");
const addNoteButton = document.querySelector(".add-note-button");
const modalCancelButton = document.querySelector(".modal-cancel");
const modalSubmitButton = document.querySelector(".modal-submit");
const showArchivedNotesButton = document.querySelector(".archived-button");
const deleteAllButton = document.querySelector(".delete-all-button");
const appHeader = document.querySelector(".app-header");
const noteStatsContainer = document.querySelector(".notes-stats-container");

let showArchived = false;

function renderNotesList(notes) {
  const notesHeader = document.querySelector(".notes-header");
  notesContainer.innerHTML = "";
  notesContainer.appendChild(notesHeader);

  notes.forEach((note) => {
    const newUINote = document.createElement("div");
    newUINote.classList.add("note");

    const deleteNoteButton = document.createElement("button");
    deleteNoteButton.classList.add("delete-note-button");
    deleteNoteButton.setAttribute("data-note-id", note.id);
    deleteNoteButton.setAttribute("data-archived", note.archived);

    const archiveNoteButton = document.createElement("button");
    archiveNoteButton.classList.add("archive-note-button");
    archiveNoteButton.setAttribute("data-note-id", note.id);
    archiveNoteButton.setAttribute("data-archived", note.archived);

    const editNoteButton = document.createElement("button");
    editNoteButton.classList.add("edit-note-button");
    editNoteButton.setAttribute("data-note-id", note.id);
    editNoteButton.setAttribute("data-archived", note.archived);

    let categoryIconClass = getCategoryIconClass(note.category);

    newUINote.innerHTML = ` <div><i class="${categoryIconClass}"></i>${note.title}</div>
    <div>${note.createdDate}</div>
    <div>${note.category}</div>
    <div>${note.body}</div>
    <div>${note.mentionedDates}</div>
    <div class="controls-container" />`;

    if (!showArchived)
      newUINote
        .querySelector(".controls-container")
        .appendChild(editNoteButton);

    newUINote
      .querySelector(".controls-container")
      .appendChild(archiveNoteButton);

    newUINote
      .querySelector(".controls-container")
      .appendChild(deleteNoteButton);

    notesContainer.appendChild(newUINote);
  });
}

function countCategories(noteArray, source) {
  let categoryCounts = {
    Task: 0,
    Idea: 0,
    "Random Thought": 0,
  };

  noteArray.forEach((note) => {
    categoryCounts[note.category]++;
  });

  return { [source]: categoryCounts };
}

function renderNotesStats() {
  const notesStats = {
    ...countCategories(notes, "notes"),
    ...countCategories(archivedNotes, "archivedNotes"),
  };

  const statsHeader = document.querySelector(".notes-stats-header");
  noteStatsContainer.innerHTML = "";
  noteStatsContainer.appendChild(statsHeader);

  for (const category in notesStats.notes) {
    console.log;
    let categoryIconClass = getCategoryIconClass(category);
    const categoryRow = document.createElement("div");
    categoryRow.classList.add("notes-stats-row");
    categoryRow.innerHTML = `
      <div><i class="${categoryIconClass}"></i>${category}</div>
      <div>${notesStats.notes[category] || 0}</div>
      <div>${notesStats.archivedNotes[category] || 0}</div>
    `;
    noteStatsContainer.appendChild(categoryRow);
  }
}

notesContainer.addEventListener("click", (event) => {
  const target = event.target;
  const noteId = parseInt(target.getAttribute("data-note-id"));
  const isArchived = target.getAttribute("data-archived") === "true";
  if (target.classList.contains("delete-note-button")) {
    deleteNote(noteId);
  } else if (target.classList.contains("archive-note-button")) {
    if (isArchived) {
      unarchiveNote(noteId);
    } else {
      archiveNote(noteId);
    }
  } else if (target.classList.contains("edit-note-button")) {
    openEditModal(noteId);
  }
  renderNotesList(showArchived ? archivedNotes : notes);
  renderNotesStats();
});

addNoteButton.addEventListener("click", () => {
  modalContainer.classList.add("active");
});

modalCancelButton.addEventListener("click", () => {
  modalContainer.classList.remove("active");
});

showArchivedNotesButton.addEventListener("click", () => {
  showArchived = !showArchived;
  appHeader.innerText = showArchived ? "Archive" : "Your notes";
  const notesArray = showArchived ? archivedNotes : notes;
  renderNotesList(notesArray);
});

deleteAllButton.addEventListener("click", () => {
  deleteAllNotes();
  renderNotesList(notes);
  renderNotesStats();
});

modalSubmitButton.addEventListener("click", addNewUINote);

function addNewUINote() {
  const title = document.querySelector("#title");
  const category = document.querySelector("#category");
  const content = document.querySelector("#content");

  if (
    title.value.trim().length > 0 &&
    content.value.trim().length > 0 &&
    category.value.trim().length > 0
  ) {
    addNote(title.value, content.value, category.value);
    renderNotesList(notes);
    renderNotesStats();
    modalContainer.classList.remove("active");
    title.value = "";
    content.value = "";
    category.value = "";
  }
}

function openEditModal(id) {
  const note = notes.find((note) => note.id === id);
  const title = document.querySelector("#title");
  const category = document.querySelector("#category");
  const content = document.querySelector("#content");

  title.value = note.title;
  category.value = note.category;
  content.value = note.body;

  modalSubmitButton.innerText = "Save note";
  modalSubmitButton.removeEventListener("click", addNewUINote);
  modalSubmitButton.addEventListener("click", () => {
    saveEditedNote(note);
  });

  modalContainer.classList.add("active");
}

function saveEditedNote(note) {
  const title = document.querySelector("#title");
  const category = document.querySelector("#category");
  const content = document.querySelector("#content");

  editNote(
    note.id,
    title.value,
    content.value,
    category.value,
    note.createdDate
  );

  renderNotesList(notes);
  renderNotesStats();
  modalContainer.classList.remove("active");
}
function getCategoryIconClass(category) {
  switch (category) {
    case "Task":
      return "tasks";
    case "Idea":
      return "lightbulb";
    case "Random Thought":
      return "comment";
  }
}
renderNotesList(notes);
renderNotesStats();
