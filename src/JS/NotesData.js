import Note from "./Note";
const notes = [
  new Note(
    1,
    "Dentist Appointment",
    "I'm gonna have a dentist appointment on the 03/05/2021, I moved it from 05/05/2021",
    "Task",
    "21/07/2023"
  ),
  new Note(
    2,
    "Grocery Shopping",
    "Remember to buy groceries today",
    "Task",

    "18/07/2023"
  ),
  new Note(
    3,
    "New Project Idea",
    "Had a great idea for a new project",
    "Idea",
    "12/07/2023"
  ),
  new Note(
    4,
    "Call John",
    "I need to call John tomorrow",
    "Task",
    "25/06/2023"
  ),
  new Note(
    5,
    "Try New Restaurant",
    "What if we try the new restaurant on Friday?",
    "Idea",
    "06/07/2023"
  ),
  new Note(
    6,
    "Upcoming Trip",
    "Feeling excited about the upcoming trip",
    "Random Thought",
    "01/07/2023"
  ),
  new Note(
    7,
    "Presentation Deadline",
    "Need to finish the presentation by 10/08/2021",
    "Task",
    "29/06/2023"
  ),
];

const archivedNotes = [];

function sortNotes(notes) {
  notes.sort((a, b) => {
    const dateA = a.createdDate.split("/").reverse().join("");
    const dateB = b.createdDate.split("/").reverse().join("");
    return dateB.localeCompare(dateA);
  });
}

sortNotes(notes);

function addNote(title, content, category) {
  const id = notes.length + 1;
  const newNote = new Note(id, title, content, category);

  notes.push(newNote);
  sortNotes(notes);
}

function deleteNote(id) {
  const notesIndex = notes.findIndex((note) => note.id === id);
  const archivedIndex = archivedNotes.findIndex((note) => note.id === id);

  if (notesIndex !== -1) {
    notes.splice(notesIndex, 1);
  } else if (archivedIndex !== -1) {
    archivedNotes.splice(archivedIndex, 1);
  }
}

function deleteAllNotes() {
  notes.length = 0;
}

function editNote(id, title, content, category, createdDate) {
  const notesIndex = notes.findIndex((note) => note.id === id);

  const editedNote = new Note(id, title, content, category, createdDate);

  if (notesIndex !== -1) {
    notes.splice(notesIndex, 1);
    notes.push(editedNote);
    sortNotes(notes);
  }
}

function archiveNote(id) {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index].archive();
    archivedNotes.push(notes[index]);
    notes.splice(index, 1);
    sortNotes(archivedNotes);
  }
}

function unarchiveNote(id) {
  const index = archivedNotes.findIndex((note) => note.id === id);

  if (index !== -1) {
    archivedNotes[index].unarchive();
    notes.push(archivedNotes[index]);
    archivedNotes.splice(index, 1);
    sortNotes(notes);
  }
}

export {
  addNote,
  archiveNote,
  archivedNotes,
  deleteAllNotes,
  deleteNote,
  editNote,
  notes,
  unarchiveNote,
};
