import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {


  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;

  formLogin: FormGroup;


  constructor(
    public authService: AuthService,private storage: AngularFireStorage,private form: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

   }

   initForm() {
    this.formLogin = this.form.group({
      name: ['', Validators.required],


    });
  }






}
