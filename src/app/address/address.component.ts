import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Address} from "./address.interface";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @ViewChild('cityNameInput') cityNameInput:ElementRef
  @ViewChild('addressNameInput') addressNameInput:ElementRef

  @Output() onAddressAdded = new EventEmitter<Address>()

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    const address = {
      city: this.cityNameInput.nativeElement.value,
      address: this.addressNameInput.nativeElement.value
    }
    this.onAddressAdded.emit(address)
  }

}
