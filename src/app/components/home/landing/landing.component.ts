import { Component, EventEmitter, Output } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageAlertInfo } from 'src/app/shared/model/MessageAlertInfo';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: true,
  imports: [SharedModule, NgbCarouselModule],
})
export class LandingComponent {
  messageAlertInfo: MessageAlertInfo;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  save() {
    this.messageAlertInfo = {
      isAlertVisiable: true,
      message: 'Text Alert',
      type: 'info',
      icon: 'info',
    };
  }
}
