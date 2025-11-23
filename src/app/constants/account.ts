import {
  groomFullName,
  brideFullName,
  groomFatherFullName,
  groomMotherFullName,
  brideFatherFullName,
  brideMotherFullName,
} from "./name";

export interface AccountInfo {
  bank: string;
  accountNumber: string;
  accountHolder: string;
  relation: string;
}

// TODO: 실제 계좌 정보로 변경
export const groomAccounts: AccountInfo[] = [
  {
    bank: "카카오뱅크",
    accountNumber: "3333-28-3589646",
    accountHolder: groomFullName,
    relation: "신랑",
  },
  {
    bank: "우체국",
    accountNumber: "110-0065-62491",
    accountHolder: groomFatherFullName,
    relation: "신랑 아버지",
  },
  {
    bank: "농협",
    accountNumber: "255-12-139633",
    accountHolder: groomMotherFullName,
    relation: "신랑 어머니",
  },
];

export const brideAccounts: AccountInfo[] = [
  {
    bank: "카카오뱅크",
    accountNumber: "3333-28-3589646",
    accountHolder: brideFullName,
    relation: "신부",
  },
  {
    bank: "국민은행",
    accountNumber: "123-999-888777",
    accountHolder: brideFatherFullName,
    relation: "신부 아버지",
  },
  {
    bank: "국민은행",
    accountNumber: "123-444-555666",
    accountHolder: brideMotherFullName,
    relation: "신부 어머니",
  },
];
