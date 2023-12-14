import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements AfterViewInit {
  @ViewChild('registrapp') registrapp!: ElementRef;

  constructor(
    private router: Router, private aniCtrl: AnimationController
  ) { }
    
  ngAfterViewInit(): void {
    const ani = this.aniCtrl.create()
    .addElement(this.registrapp.nativeElement)
    .duration(2000)
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2');
    ani.play();
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.router.navigate(['/home']);
    },4000);
  }

}
