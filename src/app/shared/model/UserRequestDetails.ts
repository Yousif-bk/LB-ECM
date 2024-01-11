interface Location {
  id: string;
  userId: string;
  bigDataId:number;
  emirate: string;
  area: string;
  address: string | null;
}

interface Approval {
  id: string;
  requestId: string;
  adminApprovalStatus: number;
  superAdminApprovalStatus: number;
  adminApprovalDate: string;
  superAdminApprovalDate: string;
}

interface User {
  firstName: string;
  lastName: string;
  fullname: string;
  location: Location;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

export interface UserRequestDetails {
  id: string;
  userId: string;
  customerName: string;
  mobile: string;
  email: string;
  eid: string;
  tradeLicense: string;
  authorisedPerson: string;
  campaignContent: string;
  approval: Approval;
  user: User;
  senderId:string
}
