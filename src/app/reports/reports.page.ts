import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  reportForm: FormGroup
  users: any[] = [];
  constructor(private navCtrl: NavController, private fb: FormBuilder, private http: HttpClient) {
    this.reportForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    })
  }

  customPopoverOptions = {
    header: 'Gender',
    subHeader: 'Select your gender',
    message: '',
  };

  ngOnInit() {
    this.getAllUsers();
  }

  goBack() {
    this.navCtrl.back();
  }

  onSubmit() {
    if (this.reportForm.invalid) {
      alert('Please fill in all required fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('first_name', this.reportForm.get('first_name')?.value);
    formData.append('last_name', this.reportForm.get('last_name')?.value);
    formData.append('email', this.reportForm.get('email')?.value);
    formData.append('phone_number', this.reportForm.get('phone_number')?.value);
    formData.append('address', this.reportForm.get('address')?.value);
    formData.append('gender', this.reportForm.get('gender')?.value);

    this.http.post('http://127.0.0.1:8000/api/user-info', formData).subscribe(
      (response: any) => {
        console.log('user added successfully:', response);
        alert('user added successfully!');
      },
      (error) => {
        console.error('Error adding user:', error);
        alert('Failed to add user. Please try again.');
      }
    );
  }


  getAllUsers() {
    this.http.get('http://127.0.0.1:8000/api/user-info').subscribe(
      (response: any) => {
        console.log('Fetched users:', response);
        this.users = response.data;
      },
      (error) => {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users. Please try again.');
      }
    );
  }

}
