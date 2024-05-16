import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = <FormGroup>{};

  background = {
    backgroundImage:
      'url(https://img.freepik.com/vector-gratis/ilustracion-plana-dia-maestro-espanol_23-2149347437.jpg?size=338&ext=jpg&ga=GA1.1.1788068356.1715731200&semt=sph)',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null],
    });
  }

  signIn() {
    if (this.loginForm.valid) {
      setTimeout(() => {
        this.router.navigate(['home/teacher']);
      }, 2000);
    } else {
      console.log('invalid');
    }
  }

}
