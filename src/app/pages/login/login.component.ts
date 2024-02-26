import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;
  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }
  onLogin() {
    this.http.post('http://localhost:3006/userlogin',this.loginObj).subscribe(
      (res: any) => {
        if (res) {
          alert("Login success");
          this.router.navigateByUrl("/dashboard");
        } else {
          console.log("Invalid response from the server");
        }
      },
      (error) => {
        console.log("Error during login:", error);
      }
    );
  }
}
export class Login {
  username: String;
  password: String;
  constructor() {
    this.username = '';
    this.password = '';
  }
}