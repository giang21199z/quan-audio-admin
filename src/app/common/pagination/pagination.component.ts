import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from './pagination';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
    @Input('pagination') pagination: Pagination;
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
    constructor() { }

    ngOnInit() { }

    pageChangeListener(pageNum){
        this.pageChange.emit(pageNum);
    }
}
