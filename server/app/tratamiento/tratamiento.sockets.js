import Tratamiento from './tratamiento.model'

import fetchDataActions from './fetchDataActions'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (io) => {
	var tratamientoNsp = io.of('/tratamiento');
	
	tratamientoNsp.on('connection', function (socket) {

		console.log('Tratamiento Conectado.')

		fetchDataActions(tratamientoNsp, socket).listarTratamientos()
		

		socket.on('mostrar_tratamiento_idConsulta', function(data) {
			fetchDataActions(tratamientoNsp, socket).mostrarTratamientoByIdConsulta(data)
		})
		

		socket.on('crear_tratamiento', function(data) {
			Tratamiento.create(data, (err, tratamiento) => {
				if(err) {
					console.log(err)
					socket.emit('crear_tratamiento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_tratamiento', { 
					mensaje: 'Se agregó exitósamente.'
				})
						
				fetchDataActions(tratamientoNsp, socket).mostrarTratamientoByIdConsulta({ 
					id_consulta: data.id_consulta
				})

				fetchDataActions(tratamientoNsp, socket).listarTratamientos()
			})
		})


		socket.on('actualizar_tratamiento_imprimido', (data) => {
			Tratamiento.update(data, (err, tratamiento) => {
				// console.log(tratamiento)

				if(err) {
					console.log(err)
					socket.emit('actualizar_tratamiento_imprimido', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				fetchDataActions(tratamientoNsp, socket).mostrarTratamientoById(data)
			})
		})


		socket.on('eliminar_tratamiento', (data) => {
			
			referentialIntegritySimple('medicamentostratamientos', 'id_tratamiento', data.id_tratamiento, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_tratamiento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_tratamiento', { error: 'Este dato está siendo usado por otros registros.' })
					return
				} else {
					Tratamiento.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_tratamiento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}
						
						socket.emit('eliminar_tratamiento', { mensaje: 'Se Eliminó exitósamente.' })
					
						fetchDataActions(tratamientoNsp, socket).mostrarTratamientoByIdConsulta({ 
							id_consulta: data.id_consulta
						})

					})
				}
			})
		})
		
		
		socket.on('mostrar_tratamiento', (data) => {
			fetchDataActions(tratamientoNsp, socket).mostrarTratamientoById(data)
		})



		socket.on('disconnect', function () {
			console.log('Tratamiento Desconecto.')
		})
	})
}
