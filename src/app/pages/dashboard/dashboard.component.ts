import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  apiData: any[] = [];
  newPost: any = {};
  updatePost: any = {};
  searchId: string = '';
  searchResults: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('http://localhost:3006/page').subscribe(
      (res: any) => {
        this.apiData = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  createPost() {
    this.httpClient.post('http://localhost:3006/page', this.newPost).subscribe(
      (res: any) => {
        this.apiData.push(res);
        this.newPost = {};
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  updatePostMethod(postId: number) {
    this.httpClient.put(`http://localhost:3006/page/${postId}`, this.updatePost).subscribe(
      (res: any) => {
        const index = this.apiData.findIndex(post => post.id === postId);
        if (index !== -1) {
          this.apiData[index] = res;
          this.updatePost = {};
        }
        alert("Cập nhật content thành công");
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
  deletePost(postId: number) {
    this.httpClient.delete(`http://localhost:3006/page/${postId}`).subscribe(
      () => {
        this.apiData = this.apiData.filter(post => post.id !== postId);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
  searchById() {
    if (this.searchId.trim() !== '') {
      this.httpClient.get<any>(`http://localhost:3006/page/${this.searchId}`)
        .subscribe(
          (result) => {
            this.searchResults = result;
          },
          (error) => {
            console.error('Lỗi khi tìm kiếm', error);
          }
        );
    }
  }
}

