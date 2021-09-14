import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {
  profileForm = new FormGroup({
    favoriteColorControl: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
    // this.profileForm.favoriteColorControl.setValue('Set value');
  }

  submit() {
    console.log(this.profileForm.value);
  }

}
