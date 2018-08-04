import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SlideService } from '../../services/slide.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  public slides;
  constructor( public toastr: ToastsManager, vcr: ViewContainerRef,
  private slideService: SlideService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.slideService.getSlides({}, data => {
      this.slides = data;
  }, error => {
      console.log(error);
  });
  }

}
