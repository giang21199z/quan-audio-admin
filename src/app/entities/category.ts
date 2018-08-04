export class Category{
    private id = 0;
    private name = '';
    private listChild: [Category];

    constructor({id: id, name: name, listChild: listChild}){
        this.id = id;
        this.name = name;
        this.listChild = listChild;
    }
}