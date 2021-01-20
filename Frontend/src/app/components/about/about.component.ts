import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	public title: string;
	public subtitle: string;
	public email: string;

  constructor() {
  	this.title = "MovieVision";
  	this.subtitle = "Página web de prueba creada como parte de mi portafolio de desarrollo web"
  	this.email = "adrianitamunoz0@gmail.com"

  }

  ngOnInit(): void {
  }

}
