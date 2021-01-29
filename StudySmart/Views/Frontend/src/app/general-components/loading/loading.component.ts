import { Component, OnInit } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loadingConfig = {
    animationType: ngxLoadingAnimationTypes.threeBounce,
    fullScreenBackdrop: true,
    primaryColour: '#292b2c',
    secondaryColour: '#292b2c',
    tertiaryColour: '#292b2c'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
