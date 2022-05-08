import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {never, Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../shared/modal/modal.component";

@Injectable()
export class ErrorHandler implements HttpInterceptor {

  constructor(public dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.error === ErrorType.DELETE_USED_RECORD) {
          const dialogRef = this.dialog.open(ModalComponent, {
            width: '550px',
            data: {
              title: 'Удаление записи',
              description: 'Вы не можете удалить эту запись, так как оно еще используется',
              buttons: [{
                label: 'Закрыть',
                action: () => dialogRef.close()
              }]
            }
          })
          return never();
        } else {
          return throwError(error);
        }
      })
    );
  }
}

export enum ErrorType {
  DELETE_USED_RECORD = 'DELETE_USED_RECORD'
}
