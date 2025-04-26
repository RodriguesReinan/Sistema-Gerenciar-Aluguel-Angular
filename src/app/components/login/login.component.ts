import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private service: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.Dologin(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']); // redirect após o login
      },
      error: (err) => {
        console.log('Erro no login: ', err);
        alert('credenciais inválidas.')
      }
    });
  }

}
