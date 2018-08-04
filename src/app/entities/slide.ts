export class Slide{
    private idslide: number;
    private title: string;
    private description: string;
    private content: string;
    private advertisement: string;
    private image: string;

    constructor({idslide: idslide, title: title, description: description, content: content, advertisement: advertisement, image: image}){
        this.idslide = idslide;
        this.title = title;
        this.description = description;
        this.content = content;
        this.advertisement = advertisement;
        this.image = image;
    }
}