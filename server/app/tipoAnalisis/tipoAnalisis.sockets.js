import TipoAnalisis from './tipoAnalisis.model'

import verifyRef from './././../validations/verifyRef.js'

export default (io) => {
	var tipoAnalisisNsp = io.of('/tipoAnalisis');
	
	tipoAnalisisNsp.on('connection', function (socket) {

		console.log('Tipo Analisis Conectado.')

		function tiposAnalisis() {
			TipoAnalisis.find((err, tiposAnalisis) => {
				// console.log(tiposAnalisis)
				if(err) {
					console.log(err)
					
					socket.emit('listar_tiposAnalisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				tipoAnalisisNsp.emit('listar_tiposAnalisis', { 
					tiposAnalisis: tiposAnalisis 
				})
			})
		}
		
		tiposAnalisis()


		socket.on('crear_tipoAnalisis', function(data) {
			TipoAnalisis.verifyIfExist(data, (err, tipoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(tipoExistente[0]) {
						socket.emit('crear_tipoAnalisis', { error: 'Este tipo de análisis ya está registrado' })
						return
				} else {
					TipoAnalisis.create(data, (err, tipoAnalisis) => {
						if(err) {
							console.log(err)
							socket.emit('crear_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_tipoAnalisis', { mensaje: 'Se agregó exitósamente.' })
						
						tiposAnalisis()
					})
				}
			})
		})


		socket.on('eliminar_tipoAnalisis', (data) => {
			let d = {
				table1: 'analisissolicitadostipos', 
				table2: 'analisistipos',
				table3: 'tiposanalisisparametros',
				fieldPrimaryKey: 'id_tipoAnalisis',
				primaryKey: data.id_tipoAnalisis
			}
			
			verifyRef(d, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				// console.log('En Uso TipoAnalisis ---------->')
				// console.log(enUso)
				
				if(enUso) {
					socket.emit('eliminar_tipoAnalisis', { error: 'Este dato está siendo usado por otros registros.' })
					return
				} else {
					TipoAnalisis.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_tipoAnalisis', { mensaje: 'Se Eliminó exitósamente.' })

						tiposAnalisis()
					})
				}
			})

		})


		socket.on('editar_tipoAnalisis', (data) => {
			TipoAnalisis.verifyIfExist(data, (err, tipoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(tipoExistente[0]) {
					socket.emit('editar_tipoAnalisis', { error: 'Este tipo de análisis ya está registrado' })
					return
				}
					
					
				TipoAnalisis.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_tipoAnalisis', { mensaje: 'Se actualizó exitósamente.' })
					
					tiposAnalisis()
				})
			})
		})
		
		socket.on('mostrar_tipoAnalisis', (data) => {
			TipoAnalisis.findById(data, (err, tipoAnalisis) => {
				// console.log(tipoAnalisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_tipoAnalisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_tipoAnalisis', tipoAnalisis[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Tipo Analisis Desconecto.')
		})
	})
}
