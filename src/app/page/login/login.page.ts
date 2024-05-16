import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notificacion.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = <FormGroup>{};
  email: string = "";
  pass: string = "";
  users: any = [];
  progress = 0;


  background = {
    backgroundImage:
      'url(https://img.freepik.com/vector-gratis/ilustracion-plana-dia-maestro-espanol_23-2149347437.jpg?size=338&ext=jpg&ga=GA1.1.1788068356.1715731200&semt=sph)',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public loadingController: LoadingController,
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.email],
      password: [this.pass],
    });

    console.log(this.loginForm);
  }

  signIn() {
    let url = "./../assets/data/users.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(users => {
      const emailI = this.loginForm.value.email;
      const passwordI = this.loginForm.value.password;

      const foundUser = users.filter((user: User) =>
        user.email === emailI && user.password === passwordI
      );
      console.log(foundUser);

      if (foundUser) {
        
        const rand = () => Math.random().toString(36).substr(2);
        var key = (rand() + rand() + rand() + rand()).substr(0, 20);
        console.log(key);
        localStorage.setItem('token', key);

        this.router.navigate(['home/teacher']);
      } else {
        this.notificationService.error('No se encontró el usuario');
      }
    },
      error => {
        console.error("Error al cargar los datos de los usuarios:", error);
        this.notificationService.error('Error al cargar los datos de los usuarios');
      }
    );
  }
}

interface User {
  email: string;
  password: string;
}
