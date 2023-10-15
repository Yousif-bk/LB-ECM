import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approvalStatus'
})
export class ApprovalStatusPipe implements PipeTransform {
  transform(statusCode: number): string {
    switch (statusCode) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }
}
