export class Pagination{
    private totalPage: number;
    private pageNum: number;

    constructor({totalPage: totalPage, pageNum: pageNum}){
        this.totalPage = totalPage;
        this.pageNum = pageNum;
    }

    public setPageNum(pageNum){
        this.pageNum = pageNum;
    }
}