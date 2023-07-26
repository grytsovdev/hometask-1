export default class Note {
  constructor(id, title, body, category, mentionedDates) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.category = category;
    this.createdDate = new Date();
    this.mentionedDates = mentionedDates;
    this.archived = false;
  }
  archive() {
    this.archived = true;
  }
  unarchive() {
    this.archived = false;
  }
}
