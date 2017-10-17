import NombreMedicamento from './nombreMedicamento.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (io) => {
	var nombreMedicamentoNsp = io.of('/nombreMedicamento');
	
	nombreMedicamentoNsp.on('connection', function (socket) {

		console.log('Nombre medicamento Conectado.')

		function nombresMedicamentos() {
			NombreMedicamento.find((err, nombresMedicamentos) => {
				// console.log(nombresMedicamentos)
				if(err) {
					console.log(err)
					socket.emit('listar_nombresMedicamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				nombreMedicamentoNsp.emit('listar_nombresMedicamentos', { 
					nombresMedicamentos: nombresMedicamentos 
				})
			})
		}
		
		nombresMedicamentos()

		socket.on('crear_nombreMedicamento', function(data) {
			NombreMedicamento.verifyIfExist(data, (err, nombreExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(nombreExistente[0]) {
						socket.emit('crear_nombreMedicamento', { error: 'Este nombre ya está registrado' })
						return
				} else {
					NombreMedicamento.create(data, (err, nombreMedicamento) => {
						if(err) {
							console.log(err)
							socket.emit('crear_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_nombreMedicamento', { mensaje: 'Se agregó exitósamente.' })
						
						nombresMedicamentos()
					})
				}
			})
		})


		socket.on('eliminar_nombreMedicamento', (data) => {
			referentialIntegritySimple('medicamentos', 'id_nombreMedicamento', data.id_nombreMedicamento, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_nombreMedicamento', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					NombreMedicamento.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_nombreMedicamento', { mensaje: 'Se Eliminó exitósamente.' })

						nombresMedicamentos()
					})
				}
			})
			
		})


		socket.on('editar_nombreMedicamento', (data) => {
			NombreMedicamento.verifyIfExist(data, (err, nombreExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(nombreExistente[0]) {
					socket.emit('editar_nombreMedicamento', { error: 'Este nombre ya está registrado' })
					return
				}
					
					
				NombreMedicamento.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_nombreMedicamento', { mensaje: 'Se actualizó exitósamente.' })
					
					nombresMedicamentos()
				})
			})
		})
		
		socket.on('mostrar_nombreMedicamento', (data) => {
			NombreMedicamento.findById(data, (err, nombreMedicamento) => {
				// console.log(nombreMedicamento)

				if(err) {
					console.log(err)
					socket.emit('mostrar_nombreMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_nombreMedicamento', nombreMedicamento[0])
			})
		})


		socket.on('disconnect', function () {
			console.log('Nombre medicamento Desconecto.')
		})
	})
}
