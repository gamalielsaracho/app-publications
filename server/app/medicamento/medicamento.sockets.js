import Medicamento from './medicamento.model'

import MedicamentoDroga from '../medicamentoDroga/medicamentoDroga.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

export default (io) => {
	var medicamentoNsp = io.of('/medicamento');
	
	medicamentoNsp.on('connection', function (socket) {

		console.log('Medicamento Conectado.')

		function medicamentos() {
			Medicamento.find((err, medicamentos) => {
				// console.log(medicamentos)
				if(err) {
					console.log(err)
					
					socket.emit('listar_medicamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				medicamentoNsp.emit('listar_medicamentos', { 
					medicamentos: medicamentos
				})
			})
		}
		
		medicamentos()

		function medicamentosConListaDeDrogas() {
			Medicamento.find((err, medicamentos) => {
				// console.log(medicamentos)
				if(err) {
					console.log(err)
					
					socket.emit('listar_medicamentos_lista_drogas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				let longMedicamentos = medicamentos.length

				medicamentos.map((i) => {
					MedicamentoDroga.find(i.medicamento.id_medicamento , (err, drogas) => {
						if(err) {
							console.log(err)
							socket.emit('listar_medicamentos_lista_drogas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
						}
						
						i.drogas = drogas

						if(i == medicamentos[longMedicamentos - 1]) {
							medicamentoNsp.emit('listar_medicamentos_lista_drogas', { 
								medicamentos: medicamentos
							})
						}
					})
				})

				// console.log(medicamentos)

			})
		}

		medicamentosConListaDeDrogas()


		socket.on('crear_medicamento', function(data) {
			// Medicamento.verifyIfExist(data, (err, nivelExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

				// if(nivelExistente[0]) {
				// 		socket.emit('crear_medicamento', { error: 'Este nivel ya está registrado' })
				// 		return
				// } else {
					Medicamento.create(data, (err, medicamento) => {
						if(err) {
							console.log(err)
							socket.emit('crear_medicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_medicamento', { 
							mensaje: 'Se agregó exitósamente.',
							idMedicamentoInsertado: medicamento.insertId
						})
						
						medicamentos()
						medicamentosConListaDeDrogas()
					})
				// }
			// })
		})


		socket.on('eliminar_medicamento', (data) => {
			referentialIntegritySimple('medicamentosXentregados', 'id_medicamento', data.id_medicamento, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_medicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_medicamento', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Medicamento.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_medicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_medicamento', { mensaje: 'Se Eliminó exitósamente.' })

						medicamentos()
					})
				}
			})

			
		})

		socket.on('mostrar_medicamento_editar', (data) => {
			Medicamento.findByIdToUpdate(data, (err, medicamento) => {
				// console.log(medicamento)

				if(err) {
					console.log(err)
					socket.emit('mostrar_medicamento_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_medicamento_editar', medicamento[0])
			})
		})


		socket.on('editar_medicamento', (data) => {
			// Medicamento.verifyIfExist(data, (err, nivelExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 	}

				// if(nivelExistente[0]) {
				// 	socket.emit('editar_medicamento', { error: 'Este nivel ya está registrado' })
				// 	return
				// }
					
					
				Medicamento.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_medicamento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_medicamento', { mensaje: 'Se actualizó exitósamente.' })

					// Volvemos a busrcar el medicamento editado
					// para emitir los cambios.
					Medicamento.findById(data, (err, medicamento) => {
						if(err) {
							console.log(err)
							socket.emit('mostrar_medicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('mostrar_medicamento', medicamento[0])
					})
					
					medicamentos()
				})
			// })
		})
		
		socket.on('mostrar_medicamento', (data) => {
			Medicamento.findById(data, (err, medicamento) => {
				// console.log(medicamento)

				if(err) {
					console.log(err)
					socket.emit('mostrar_medicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_medicamento', medicamento[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Medicamento Desconecto.')
		})
	})
}
