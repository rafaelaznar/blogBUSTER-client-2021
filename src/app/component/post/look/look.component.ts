import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';
import { IPost } from 'src/app/model/model-interfaces';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.css']
})
export class LookPostComponent implements OnInit {

  @Input() show: Observable<number>;

  oPost: IPost;
  strResult: string = null;

  private eventsSubscription: Subscription;

  constructor(
    private oPostService: PostService
  ) {

  }

  ngOnInit() {
    this.eventsSubscription = this.show.subscribe((id: number) => this.getOne(id));
  }

  getOne = (id: number) => {
    this.oPostService.getOne(id).subscribe((oData: IPost) => {
      this.oPost = oData;
    })
  }

}
