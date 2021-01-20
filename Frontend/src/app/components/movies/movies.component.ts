import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [ProjectService]
})
export class MoviesComponent implements OnInit {
	public projects: Project[];
	public url: string;
  public config: any;

  constructor(
  	private _projectService: ProjectService
  ){
  	this.url = Global.url;

    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
    };
  }

  ngOnInit(){
  	this.getProjects();
  }

  getProjects(){
  	this._projectService.getProjects().subscribe(
  		response => {
  			if(response.projects){
  				this.projects = response.projects;
  			}
  		},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
