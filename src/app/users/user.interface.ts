import {Department} from "../department/department.interface";

export interface User {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  department: Department
}
