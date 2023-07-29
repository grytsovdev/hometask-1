export default class Note {
  constructor(id, title, body, category, createdDate) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.category = category;
    if (!createdDate) this.createdDate = this.getCreatedDate();
    else this.createdDate = createdDate;
    this.mentionedDates = this.getMentionedDates(body);
    this.archived = false;
  }

  archive() {
    this.archived = true;
  }
  unarchive() {
    this.archived = false;
  }

  getCreatedDate() {
    const date = new Date();
    return date.toLocaleDateString("en-GB");
  }

  getMentionedDates(body) {
    const dateRegex = /\d{2}([\/.-])\d{2}\1\d{4}/gi;
    const dates = body.match(dateRegex);
    return dates ? dates : "";
  }
}
