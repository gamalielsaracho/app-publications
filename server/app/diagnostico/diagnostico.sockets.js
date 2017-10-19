import Diagnostico from './diagnostico.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (io) => {
	var diagnosticoNsp = io.of('/diagnostico');
	
	diagnosticoNsp.on('connection', function (socket) {

		console.log('Diagnostico Conectado.')

		function diagnosticos() {
			Diagnostico.find((err, diagnosticos) => {
				// console.log(diagnosticos)
				if(err) {
					console.log(err)
					
					socket.emit('listar_diagnosticos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				diagnosticoNsp.emit('listar_diagnosticos', { diagnosticos: diagnosticos })
			})
		}
		
		diagnosticos()


		socket.on('crear_diagnostico', function(data) {
			console.log(data)
			Diagnostico.verifyIfExist(data, (err, diagnosticoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(diagnosticoExistente[0]) {
						socket.emit('crear_diagnostico', { error: 'Este diagnóstico ya está registrado' })
						return
				} else {
					Diagnostico.create(data, (err, diagnostico) => {
						if(err) {
							console.log(err)
							socket.emit('crear_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_diagnostico', { mensaje: 'Se agregó exitósamente.' })
						
						diagnosticos()
					})
				}
			})
		})


		socket.on('eliminar_diagnostico', (data) => {
			referentialIntegritySimple('consultasdiagnosticos', 'id_diagnostico', data.id_diagnostico, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_diagnostico', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Diagnostico.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_diagnostico', { mensaje: 'Se Eliminó exitósamente.' })

						diagnosticos()
					})
				}
			})
		})


		socket.on('editar_diagnostico', (data) => {
			Diagnostico.verifyIfExist(data, (err, diagnosticoExistente) => {
				if(err) {
					console.log(err)
					socket.emit('editar_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(diagnosticoExistente[0]) {
					socket.emit('editar_diagnostico', { error: 'Este diagnóstico ya está registrado' })
					return
				}
					
					
				Diagnostico.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_diagnostico', { mensaje: 'Se actualizó exitósamente.' })
					
					diagnosticos()
				})
			})
		})
		
		socket.on('mostrar_diagnostico', (data) => {
			Diagnostico.findById(data, (err, diagnostico) => {
				// console.log(diagnostico)

				if(err) {
					console.log(err)
					socket.emit('mostrar_diagnostico', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_diagnostico', diagnostico[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Diagnostico Desconecto.')
		})
	})
}
