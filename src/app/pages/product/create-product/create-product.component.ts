import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  editorContent: string;
  constructor() { }

  ngOnInit() {
    this.editorContent = 'giang'
  }

  getValue(){
    console.log(this.editorContent);
    return false;
  }

}
