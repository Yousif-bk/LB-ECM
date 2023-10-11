import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-path-not-found',
  templateUrl: './path-not-found.component.html',
  styleUrls: ['./path-not-found.component.scss']
})
export class PathNotFoundComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}
