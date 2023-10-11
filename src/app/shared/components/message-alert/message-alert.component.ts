import { Component, Input, OnInit } from '@angular/core';
import { MessageAlertInfo } from '../../model/MessageAlertInfo';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.scss']
})
export class MessageAlertComponent {
  @Input() messageAlertInfo: MessageAlertInfo;
}
