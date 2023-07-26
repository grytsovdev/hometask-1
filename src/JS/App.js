import { notes } from "./NotesData";
const notesContainer = document.querySelector(".notes-container");

function renderNotesList() {
  notes.forEach((note) => {
    const newUINote = document.createElement("div");
    newUINote.classList.add("note");
    newUINote.innerHTML = ` <div>${note.title}</div>
    <div>${note.createdDate}</div>
    <div>${note.category}</div>
    <div>${note.body}</div>
    <div>${note.mentionedDates}</div>`;
    notesContainer.appendChild(newUINote);
  });
}
renderNotesList();
