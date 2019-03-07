import { Component, OnInit, Input } from '@angular/core';
import { Clients } from '../models/clients';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { globals } from '../../environments/globals';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterLabel: string;
  lists: string[] = [];
  consultantList: string[] = ['Carlos Ferreira', 'Cláudio', 'José'];
  clientsList: string[] = ['Gabriela', 'Jos'];
  count: number = 0;
  model: any = {};
  private ownerForm: FormGroup;

  @Input('filterLabel')
  set _filterLabel(data: string) {

     this.filterLabel = data;
     if(this.filterLabel == this.global.labelsTarget[0]) {
       this.lists = this.consultantList; 
     } else if(this.filterLabel == this.global.labelsTarget[1]) {
      this.lists = this.clientsList; 
    }    

  }

  constructor(public global:globals) {

  }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      startDate: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      endDate: new FormControl(new Date()),
      items: new FormControl()
    });
  }

  public createOwner = (ownerFormValue) => {
    if (this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue);
    }
  }

  private executeOwnerCreation = (ownerFormValue) => {
    console.log(ownerFormValue);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

}
