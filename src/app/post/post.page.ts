import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      userId: ['',[ Validators.required]],
    })
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postData = this.postForm.value;
      fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Post added successfully:', data);
          alert('Post added successfully!');
        })
        .catch((error) => {
          console.error('Error adding post:', error);
          alert(`Failed to add post: ${error.message}`);
        });
    } else {
      alert('Please fill in all required fields.');
    }
  }
  

  ngOnInit() {
  }

}
