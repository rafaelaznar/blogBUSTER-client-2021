/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LookPostComponent } from './look.component';

describe('ReadComponent', () => {
  let component: LookPostComponent;
  let fixture: ComponentFixture<LookPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
