import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MaterialValuesService } from 'src/app/services/material-values.service';
import { MaterialValues, MaterialType } from "./material-values.interface";
import { User } from '../users/user.interface';
import { UserService } from "../../services/user.service";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormModalComponent } from "../../shared/form-modal/form-modal.component";


@Component({
  selector: 'app-material-values',
  templateUrl: './material-values.component.html',
  styleUrls: ['./material-values.component.css']
})
export class MaterialValuesComponent implements OnInit {

  form: FormGroup;

  dataSource = new MatTableDataSource<MaterialValues>();
  user: Array<User> = []

  displayedColumns = ['id', 'name', 'inventNumber', 'price', 'materialType', 'yearOfPurchase', 'menu']

  materialValuesFields = [{
    id: 'name',
    label: 'Актив',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'name',
    type: 'text',
    controlType: 'input',
    formControlName: 'name'
  },
    {
      id: 'inventNumber',
      label: 'Инвентарный номер',
      // значение соответствует поле объекта, который будет сохранен
      // например при post запросе значение будет использоваться как ключ
      // post -> { name: 'Какое-то значение' }
      name: 'inventNumber',
      type: 'text',
      controlType: 'input',
      formControlName: 'inventNumber'
    },
    {
      id: 'price',
      label: 'Цена',
      // значение соответствует поле объекта, который будет сохранен
      // например при post запросе значение будет использоваться как ключ
      // post -> { name: 'Какое-то значение' }
      name: 'price',
      type: 'text',
      controlType: 'input',
      formControlName: 'price'
    },
    {
      id: 'materialType',
      label: 'Тип',
      // значение соответствует поле объекта, который будет сохранен
      // например при post запросе значение будет использоваться как ключ
      // post -> { name: 'Какое-то значение' }
      name: 'materialType',
      options: Object.values(MaterialType),
      controlType: 'select',
      formControlName: 'materialType',
      dataType: 'enum'
    },
    {
      id: 'yearOfPurchase',
      label: 'Год производства',
      // значение соответствует поле объекта, который будет сохранен
      // например при post запросе значение будет использоваться как ключ
      // post -> { name: 'Какое-то значение' }
      name: 'yearOfPurchase',
      type: 'text',
      controlType: 'input',
      formControlName: 'yearOfPurchase'
    }
   /* {
      id: 'usedBy',
      label: 'Кем используется',
      controlType: 'select',
      options: this.user,
      displayValue: 'username',
      setValue: 'id',
      name: 'userId',
      formControlName: 'userId'
    }*/

  ]

  constructor(private materialValuesService: MaterialValuesService,
              private userService: UserService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.form = formBuilder.group(
      {
        name: new FormControl(null, [Validators.required]),
        inventNumber: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        materialType: new FormControl(null, Validators.required),
        yearOfPurchase: new FormControl(null, [Validators.required]),
     /*   userId: new FormControl(null, Validators.required)*/

      }
    )
  }

  ngOnInit(): void {
    this.load()  //вытягивает из БД
    //загружает справочник UserSe
    this.userService.getUsers().subscribe(data => {
      this.user.length = 0
      this.user.push(...data)
    })
  }

  add() {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Добавление актива',
        fields: this.materialValuesFields,
        buttons: [{
          color: 'primary',
          disabled: () => this.form.invalid,
          action: (element: any) => {
            this.materialValuesService.save(this.form.value)
              .subscribe(() => this.load())
            dialogRef.close()
          },
          label: 'Сохранить'
        }, {
          action: () => dialogRef.close(),
          label: 'Закрыть'
        }],
        form: this.form
      }
    })
  }

  edit(material_values: MaterialValues) {
    this.form.patchValue(material_values)
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '550px',
      data: {
        title: 'Редактирование актива',
        fields: this.materialValuesFields,
        buttons: [
          {
            color: 'primary',
            disabled: () => this.form.invalid,
            action: () => {
              this.materialValuesService.edit(Object.assign(material_values, this.form.value))
                .subscribe(() => this.load())
              dialogRef.close()
            },
            label: 'Редактировать'
          },{
            action: () => dialogRef.close(),
            label: 'Закрыть'
          }
        ],
        form: this.form
      }
    })
  }

  delete(material_values: MaterialValues) {
    this.materialValuesService.delete(material_values)
      .subscribe(() => this.load())
  }

  load() {
    this.materialValuesService.getMaterialValues()
      .subscribe(data => {
        this.dataSource.data = data
      })
  }
}
