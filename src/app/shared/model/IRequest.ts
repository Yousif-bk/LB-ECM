export interface IRequest {
  requestId: string;
  userId: string;
  customerName: string;
  mobile: string;
  email: string;
  eid: string | null;
  tradeLicense: string | null;
  authorisedPerson: string;
  campaignContent: string;
}
