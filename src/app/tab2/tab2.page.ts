import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  signatureImg: string = '';
  signaturePadOptions: Object = { 
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.signatureImg = this.signaturePad.toDataURL();
    console.log('drawed',this.signatureImg);
  }

}
