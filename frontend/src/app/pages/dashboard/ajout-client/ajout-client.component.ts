import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AjoutClientComponent implements OnInit, OnDestroy {
  @Output() addEvent = new EventEmitter<string>()
  addForm: FormGroup
  private subs = new SubSink()
  

  constructor(private fb: FormBuilder, private clientService: ClientService) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      raison_social: null,
      num_sirette: null,
      adresse: null,
      email: null,
      telephone: null


    })
   
  }
onSubmitAdd() {
  let formValue = this.addForm.value
  console.log(formValue);
  this.subs.sink = this.clientService.addClient(formValue).subscribe(res => {
    console.log(formValue)
    this.clientService.insertClient(formValue)
    this.addForm.reset()
    // this.addEvent.emit("reload")
    
    console.log(res);
  })

}
ngOnDestroy(): void {
    this.subs.unsubscribe()
}

}
