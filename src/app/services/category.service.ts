import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { APP_CONSTANTS } from '../common/config/constants';
import { Category } from '../entities/category';

@Injectable()
export class CategoryService {

  constructor(private http:HttpClient) { }

  /**
   * get category
   */
  getAllCategory(successCb, errorCb){
    this.http.get(APP_CONSTANTS.URL_GET_CATEGORIES)
      .subscribe(data => {
        successCb(this.mappingData(data))
      }, error => errorCb);
  }
  mappingData(datas): any{
    let listCategory = [];
    for(let item of datas){
      if(item.listChild.length){
          let childrent = [];
        for(let child of item.listChild){
          let category = new Category({id: child.idtype, name: child.name, listChild: []});  
            childrent.push(category);
        }
        let category = new Category({id: item.idtype, name: item.name, listChild: childrent});
        listCategory.push(category);
      } else{
        let category = new Category({id: item.idtype, name: item.name, listChild: []});
        listCategory.push(category);
      }
    }
    return listCategory;
  }
}
