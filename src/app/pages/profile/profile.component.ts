import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  apiData: any[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.httpClient.get('http://localhost:3006/profile').subscribe(
      (res: any) => {
        console.log(res);
        this.apiData = res
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
}
