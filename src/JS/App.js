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

    const archiveNoteButton = document.createElement("button");
    archiveNoteButton.classList.add("archive-note-button");
    archiveNoteButton.setAttribute("data-note-id", note.id);
    archiveNoteButton.setAttribute("data-archived", note.archived);

    const editNoteButton = document.createElement("button");
    editNoteButton.classList.add("edit-note-button");
    editNoteButton.setAttribute("data-note-id", note.id);

    let categoryIconClass = "";
    switch (note.category) {
      case "Task":
        categoryIconClass = "tasks";
        break;
      case "Idea":
        categoryIconClass = "lightbulb";
        break;
      case "Random Thought":
        categoryIconClass = "comment";
        break;
    }

    newUINote.innerHTML = ` <div><i class="${categoryIconClass}"></i>${note.title}</div>
    <div>${note.createdDate}</div>
    <div>${note.category}</div>
    <div>${note.body}</div>
    <div>${note.mentionedDates}</div>
    <div class="controls-container" />`;

    newUINote.querySelector(".controls-container").appendChild(editNoteButton);

    newUINote
      .querySelector(".controls-container")
      .appendChild(archiveNoteButton);

    newUINote
      .querySelector(".controls-container")
      .appendChild(deleteNoteButton);

    notesContainer.appendChild(newUINote);
  });
}

notesContainer.addEventListener("click", (event) => {
  const target = event.target;
  const noteId = parseInt(target.getAttribute("data-note-id"));
  if (target.classList.contains("delete-note-button")) {
    deleteNote(noteId);
    renderNotesList(notes);
  } else if (target.classList.contains("archive-note-button")) {
    const isArchived = target.getAttribute("data-archived") === "true";
    if (isArchived) {
      unarchiveNote(noteId);
    } else {
      archiveNote(noteId);
    }
    renderNotesList(showArchived ? archivedNotes : notes);
  } else if (target.classList.contains("edit-note-button")) {
    openEditModal(noteId);
  }
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
    saveEditedNote(id);
  });

  modalContainer.classList.add("active");
}

function saveEditedNote(id) {
  const title = document.querySelector("#title");
  const category = document.querySelector("#category");
  const content = document.querySelector("#content");

  editNote(id, title.value, content.value, category.value);

  renderNotesList(notes);
  modalContainer.classList.remove("active");
}

renderNotesList(notes);
