import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-reactive',
  templateUrl: './register-reactive.component.html',
  styleUrls: ['./register-reactive.component.css']
})
export class RegisterReactiveComponent implements OnInit {

  favoriteColorControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.favoriteColorControl.setValue('Set value');
  }

  submit(){
    console.log(this.favoriteColorControl.value);
  }

}
