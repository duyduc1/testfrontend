import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupObj: singUp;
  constructor(private http: HttpClient , private router : Router ) {
    this.signupObj = new singUp();
  }
  onSignup() {
    this.http.post('http://localhost:3006/userregister', this.signupObj).subscribe((res: any) => {
      if (res) {
        alert("Đăng ký thành công")
        this.router.navigateByUrl("/login")
      } else {
        console.log("Sai");
      }
    })
  }
}

export class singUp {
  username: String;
  password: String;
  email: String;
  numberphone: String;
  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.numberphone = '';
  }
}