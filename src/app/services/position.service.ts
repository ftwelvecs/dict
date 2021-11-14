import {Injectable} from "@angular/core";
import {Position} from "../positions/position.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  positions: Array<Position> = []

  constructor(private http: HttpClient) {
    this.http.get('./assets/positions.json')
      .subscribe(data => {
        this.positions.push(...<Array<Position>> data)
      })
  }

  add(position: Position) {
    this.positions.push(position)
  }

}
