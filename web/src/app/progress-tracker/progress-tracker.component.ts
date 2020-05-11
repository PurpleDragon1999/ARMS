import { IResponse } from 'src/app/models/response.interface';
import { Router } from '@angular/router';
import { AppServicesService } from 'src/app/services/app-services.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.scss']
})

export class ProgressTrackerComponent implements OnInit {

  flag : number = 0
  constructor(private _service : AppServicesService, private _route : Router) { }

  ngOnInit() {
    //progressTrackerDemo.init();
    this.loadcandidateStatus()
  }

  loadcandidateStatus(){
    let candidateId = this._route.url.split("/")[2]
    this._service.getCandidate(candidateId).subscribe((res:IResponse)=>{    
      let candidateData = res.payload.data
      this.flag = candidateData.flag      
      
    })
    


  }


}

// var progressTrackerDemo = (function() {

//   var animPathLinks = document.querySelectorAll('.anim--path .progress-step');
//   var animPathLinksLength = animPathLinks.length;

//   function init() {

//     if (animPathLinksLength > 0) {
//       for (var i = 0; i < animPathLinksLength; i++) {
//         _handleClick(animPathLinks[i], i);
//       }
//     }

//   }

//   function _handleClick(link, index) {
//     link.addEventListener('click', function(e) {
//       e.preventDefault();
//       _deactivateOtherLinks(index);
//       _toggleClass(this, 'is-complete');

//       if(this.nextElementSibling !== null) {
//         _toggleClass(this.nextElementSibling, 'is-active');
//       }

//     });
//   }

//   function _deactivateOtherLinks(activeIndex) {

//     for (var i = 0; i < animPathLinksLength; i++) {
//       if (i >= activeIndex) {
//         _removeClass(animPathLinks[i], 'is-complete');
//         _removeClass(animPathLinks[i], 'is-active');
//       }
//     }
//   }

//   function _toggleClass(element, className) {

//     if (element.classList) {
//       element.classList.toggle(className);
//     } else {
//       var classes = element.className.split(' ');
//       var existingIndex = classes.indexOf(className);

//       if (existingIndex >= 0) {
//       classes.splice(existingIndex, 1);
//       } else {
//       classes.push(className);
//       }

//       element.className = classes.join(' ');
//     }

//   }

//   function _removeClass(element, className) {

//     if (element.classList) {
//       element.classList.remove(className);
//     } else {
//       element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
//     }

//   }

  
//   return {
//     init: init
//   };

// })();
