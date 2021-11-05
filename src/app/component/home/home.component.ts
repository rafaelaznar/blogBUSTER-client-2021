import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { PaginationService } from 'src/app/service/pagination.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  title = 'blogBUSTER-client-2021';

  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPaginationService: PaginationService,
    private oPostService: PostService,
  ) {
    if (this.oActivatedRoute.snapshot.data.message) {
      localStorage.setItem("user", this.oActivatedRoute.snapshot.data.message);
    } else {
      localStorage.clear();
    }

    this.page = 1;
    this.getPage();
  }

  reset() {
    this.title = 'blogBUSTER';
  }

  ngOnInit(): void {
  }

  getPage = () => {
    this.oPostService.getPage(this.pageSize, this.page, "", 'fecha', 'desc').subscribe((oPage: IPage) => {
      this.aPosts = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
    })
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }

}
