export class News{
    private idnews: number;
    private title: string;
    private description: string;
    private content: string;
    private updated: string;
    private image: string;

    constructor({idnews: idnews, title: title, description: description, content: content, updated: updated, image: image}){
        this.idnews = idnews;
        this.title = title;
        this.description = description;
        this.content = content;
        this.updated = updated;
        this.image = image;
    }
}