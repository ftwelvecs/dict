import {User} from "../users/user.interface";

export interface MaterialValues{
  id?: number,
  name?: string,
  inventNumber?: number,
  price?: number,
  materialType?: MaterialType,
  yearOfPurchase?: number,
  usedBy?: User
}

export enum MaterialType{
  COMPUTER = 'COMPUTER', PRINTER = 'PRINTER', UPS = 'UPS', IP_PHONE = 'IP_PHONE', CHAIR = 'CHAIR',
  TABLE = 'TABLE', NIGHTSTAND = 'NIGHTSTAND'
}
