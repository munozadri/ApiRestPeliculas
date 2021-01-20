'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {

	saveProject: function(req, res){
		var project = new Project();
		var params = req.body;

		project.nombre = params.nombre;
		project.origen = params.origen;
		project.ano = params.ano;
		project.director = params.director;
		project.reparto = params.reparto;
		project.image = null;

		project.save((err, projectStored) => {
			if(err) return res.status(500).send({ message: 'Error al guardar...'});
			if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar la película'});
			return res.status(200).send({project: projectStored});
		});		

	},

	getProject: function(req, res){
		var projectId = req.params.id;

		if(projectId == null) return res.status(404).send({message: 'La película no existe'});
	

		Project.findById(projectId, (err, project) => {
			if(err) return res.status(500).send({message: 'Error al devolver los datos'});
			if(!project) return res.status(404).send({message: 'La película no existe'});

			return res.status(200).send({
				project
			});

		});
	},

	getProjects: function(req, res){
		Project.find({}).sort('-year').exec((err, projects) =>{
			if(err) return res.status(500).send({message:'Error al devolver las peliculas'});
			if(!projects) return res.status(404).send({message:'No hay películas para listar'});
			return res.status(200).send({projects});

		})
	},

	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) =>{
			if(err) return res.status(500).send({message:'Error al actualizar'});
			if(!projectUpdated) return res.status(404).send({message: 'No existe la pelicula ha modificar'});

			return res.status(200).send({
				project: projectUpdated
			});
		});
	},

	deleteProject: function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemoved ) =>{
			if(err) return res.status(500).send({message:'Error al eliminar la película'});
			if(!projectRemoved) return res.status(404).send({message: 'No existe película para eliminar'});

			return res.status(200).send({
				project: projectRemoved
			});

		});
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
				Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message:'Imagen no cargada'});
					if(!projectUpdated) res.status(404).send({message: 'La película no existe'});

					return res.status(200).send({
						project: projectUpdated
					});
				});
			}else{
				fs.unlink(filePath, (err) =>{
					return res.status(200).send({message: 'Extensión no válida'});
				});
			}		
			
		}else{
			return res.status(200).send({
				message: fileName
			});

		}

	},

	getImageFile: function(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message:'No existe la imagen..'
				});
			}
		});
	}

};

module.exports = controller;