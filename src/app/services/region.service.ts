import {Region} from "../region/region.interface";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  regions: Array<Region> = []

  constructor(private http: HttpClient) {
    this.http.get("./assets/regions.json")
      .subscribe(data => {
        this.regions.push(...<Array<Region>> data)
      })
  }

  add(region: Region) {
    this.regions.push(region)
  }

  findByName(name: string): Region | undefined {
    return this.regions.find(region => region.name == name)
  }
}
