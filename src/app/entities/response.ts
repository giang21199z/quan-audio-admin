export class Response{
    private totalPage: number;
    private pageNum: number;
    private data: any;

    public constructor({totalPage: totalPage, pageNum: pageNum, data: data}){
        this.totalPage = totalPage;
        this.pageNum = pageNum;
        this.data = data;
    }
}