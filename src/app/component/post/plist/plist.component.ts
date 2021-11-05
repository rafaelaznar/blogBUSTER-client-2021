import { PaginationService } from './../../../service/pagination.service';
import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.css']
})
export class PlistPostComponent implements OnInit {

  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;
  id2ShowViewModal: number = 0;
  strUsuarioSession: string;
  strResult: string = null;
  filterActual: string = "";
  currentSortField: string = "";
  currentSortDirection: string = "";
  filtered: boolean = false;

  eventsSubjectView: Subject<number> = new Subject<number>();
  eventsSubjectModal: Subject<void> = new Subject<void>();

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPostService: PostService,
  ) {

    if (this.oRoute.snapshot.data.message) {
      this.strUsuarioSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", this.oRoute.snapshot.data.message);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.page = 1;
    this.getPage();
  }

  ngOnInit(): void {
  }

  getPage = () => {
    this.oPostService.getPage(this.pageSize, this.page, this.filterActual, this.currentSortField, this.currentSortDirection).subscribe((oPage: IPage) => {
      if (this.filterActual) {
        this.filtered = true;
      } else {
        this.filtered = false;
      }
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

  doFilter() {
    this.getPage();
  }

  onKeydownEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      //alert("do filter");
      this.getPage();
    }
  }

  doResetFilter() {
    this.filterActual = "";
    this.getPage();
  }

  doResetOrder() {
    this.currentSortField = "";
    this.currentSortDirection = "";
    this.getPage();
  }

  doSetOrder(order: string) {
    this.currentSortField = order;
    if (this.currentSortDirection == 'asc') {
      this.currentSortDirection = 'desc';
    } else if (this.currentSortDirection == 'desc') {
      this.currentSortDirection = '';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.getPage();
  }

  showViewModal(id2ShowViewModal1: number) {
    this.eventsSubjectModal.next();
    this.eventsSubjectView.next(id2ShowViewModal1);
  }

  closeModal(): void { }

}
