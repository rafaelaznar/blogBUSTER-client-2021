import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/model-interfaces';

@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.css']
})
export class PlistComponent implements OnInit {

  aPosts: IPost[];
  totalElements: number;
  totalPages: number;

  constructor(

    private oPostService: PostService
  ) {
    oPostService.getPage(10, 1).subscribe(data => {
      this.aPosts = data.content;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      console.log(data);
    });
  }

  ngOnInit(): void {

  }

}
