import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    SignaturePadModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule { }
