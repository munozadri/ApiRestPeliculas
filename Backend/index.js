'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/peliculas', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
		.then(() => {
			console.log("Conexión a la Base de Datos establecida satisfactoriamente");
			//Creación del Servidor
			app.listen(port, () => {
				console.log("Servidor corriendo en la URL: localhost:3700");
			});

		})
		.catch(err => console.log(err));