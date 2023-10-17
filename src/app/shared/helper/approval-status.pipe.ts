import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'approvalStatus'
})
export class ApprovalStatusPipe implements PipeTransform {
  transform(statusCode: number): string {
    switch (statusCode) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case 2:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }
}
