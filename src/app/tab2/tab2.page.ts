import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  signatureImg: string = '';
  form: FormGroup;
  signaturePadOptions: Object = { 
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      signature: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.form.get('signature')?.setValue(this.signatureImg);

  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  finishSignature() {
    if (this.signaturePad.isEmpty()) {
      console.log('Signature pad is empty');
      alert('Please provide a signature.');
      return;
    }
    this.signatureImg = this.signaturePad.toDataURL();
    this.form.get('signature')?.setValue(this.signatureImg);
    console.log('Signature captured');
  }

  clearSignature() {
    this.signaturePad.clear();
    this.signatureImg = '';
    this.form.get('signature')?.setValue('');
    console.log('Signature pad cleared');
  }

  sendSignature() {
    if (this.form.invalid) {
      console.log('Form is invalid:', this.form.errors);
      alert('Please complete the form.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('signature', this.form.get('signature')?.value);

    console.log('Sending data:', { name: this.form.get('name')?.value, signature: this.form.get('signature')?.value });

    this.http.post('http://127.0.0.1:8000/api/signature', formData).subscribe({
      next: (response) => console.log('Response:', response),
      error: (error) => console.error('Error:', error)
    });
  }

}
