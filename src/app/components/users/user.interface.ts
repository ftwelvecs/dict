import {Department} from "../departments/department.interface";
import {Position} from "../positions/position.interface";

export interface User {
  id?: number,
  username?: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  department?: Department,
  position?: Position,
  departmentId?: number,
  positionId?: number
}
