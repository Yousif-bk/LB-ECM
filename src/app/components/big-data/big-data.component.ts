import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
   NgbCarouselModule],
})
export class BigDataComponent implements OnInit {
  ngOnInit(): void {
  }

}
