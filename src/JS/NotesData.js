import Note from "./Note";
const notes = [
  new Note(
    1,
    "Dentist Appointment",
    "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    "Task",
    ["3/5/2021", "5/5/2021"]
  ),
  new Note(
    2,
    "Grocery Shopping",
    "Remember to buy groceries today",
    "Task",
    []
  ),
  new Note(
    3,
    "New Project Idea",
    "Had a great idea for a new project",
    "Idea",
    []
  ),
  new Note(4, "Call John", "I need to call John tomorrow", "Task", []),
  new Note(
    5,
    "Try New Restaurant",
    "What if we try the new restaurant on Friday?",
    "Idea",
    []
  ),
  new Note(
    6,
    "Upcoming Trip",
    "Feeling excited about the upcoming trip",
    "Random Thought",
    []
  ),
  new Note(
    7,
    "Presentation Deadline",
    "Need to finish the presentation by 10/8/2021",
    "Task",
    ["10/8/2021"]
  ),
];

function addNote(title, content, category) {
  const id = notes.length + 1;
  const mentionedDates = getMentionedDates(content);
  const newNote = new Note(id, title, content, category, mentionedDates);
  notes.push(newNote);
}

function deleteNote(id) {
  notes.slice(
    notes.findIndex((note) => {
      note.id === id;
    }, 1)
  );
}

function editNote() {
  //implement edeting of the notes
}

function getMentionedDates(content) {
  // implement extraction of mentiond dates
}

export { addNote, deleteNote, editNote, notes };
