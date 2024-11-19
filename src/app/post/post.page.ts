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
  imageFile: File | null = null; 
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      start_date: ['2024-11-01', [Validators.required]],
      end_date: ['2024-12-21', [Validators.required]],
      description: ['',[ Validators.required]],
    })
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      console.log('Selected image:', this.imageFile);
    }
  }

  onSubmit() {
    if (this.postForm.invalid || !this.imageFile) {
      alert('Please fill in all required fields and select an image.');
      return;
    }

    // Prepare FormData object for submission
    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('start_date', this.postForm.get('start_date')?.value);
    formData.append('end_date', this.postForm.get('end_date')?.value);
    formData.append('description', this.postForm.get('description')?.value);
    formData.append('image_url', this.imageFile);

    // Make API request using HttpClient
    this.http.post('http://127.0.0.1:8000/api/gift-cards', formData).subscribe(
      (response: any) => {
        console.log('Post added successfully:', response);
        alert('Post added successfully!');
      },
      (error) => {
        console.error('Error adding post:', error);
        alert('Failed to add post. Please try again.');
      }
    );
  }
  

  ngOnInit() {
  }

}
