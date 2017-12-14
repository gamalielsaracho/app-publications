import MedicamentoEntregado from './medicamentoEntregado.model'
import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import MedicamentoXentregado from '../medicamentoXentregado/medicamentoXentregado.model'

import MedicamentoDroga from '../medicamentoDroga/medicamentoDroga.model'

export default (io) => {
	var medicamentoEntregadoNsp = io.of('/medicamentoEntregado');
	
	medicamentoEntregadoNsp.on('connection', function (socket) {

		console.log('Medicamento entregado Conectado.')

		function medicamentosEntregados() {
			MedicamentoEntregado.find((err, medicamentosEntregados) => {
				// console.log(medicamentosEntregados)
				if(err) {
					console.log(err)
					
					socket.emit('listar_medicamentosEntregados', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				medicamentoEntregadoNsp.emit('listar_medicamentosEntregados', { medicamentosEntregados: medicamentosEntregados })
			})
		}
		
		medicamentosEntregados()


		socket.on('crear_medicamentoEntregado', function(data) {
			
			MedicamentoEntregado.create(data, (err, medicamentoEntregado) => {
				if(err) {
					console.log(err)
					socket.emit('crear_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('crear_medicamentoEntregado', { mensaje: 'Se agregó exitósamente.' })
						
				medicamentosEntregados()
			})
		})


		socket.on('eliminar_medicamentoEntregado', (data) => {
			referentialIntegritySimple('medicamentosxentregados', 'id_medicamentoEntregado', data.id_medicamentoEntregado, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_medicamentoEntregado', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					MedicamentoEntregado.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_medicamentoEntregado', { mensaje: 'Se Eliminó exitósamente.' })

						medicamentosEntregados()
					})
				}
			})
		})


		socket.on('mostrar_medicamentoEntregado_editar', (data) => {
			MedicamentoEntregado.findByIdToUpdate(data, (err, medicamentoEntregado) => {
				if(err) {
					console.log(err)
					socket.emit('mostrar_medicamentoEntregado_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_medicamentoEntregado_editar', medicamentoEntregado[0])
			})
		})

		socket.on('editar_medicamentoEntregado', (data) => {
			MedicamentoEntregado.update(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('editar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('editar_medicamentoEntregado', { mensaje: 'Se actualizó exitósamente.' })
					
				MedicamentoEntregado.findById(data, (err, medicamentoEntregado) => {
					// console.log(medicamentoEntregado)

					if(err) {
						console.log(err)
						socket.emit('mostrar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_medicamentoEntregado', medicamentoEntregado[0])
				})

				medicamentosEntregados()
			})
		})
		
		socket.on('mostrar_medicamentoEntregado', (data) => {
			MedicamentoEntregado.findById(data, (err, medicamentoEntregado) => {
				// console.log(medicamentoEntregado)

				if(err) {
					console.log(err)
					socket.emit('mostrar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_medicamentoEntregado', medicamentoEntregado[0])
			})
		})



		socket.on('atualizar_estado_impresion_medicamentoEntregado', (data) => {
			MedicamentoEntregado.updateStatePrint(data, (err, datos) => {
				if(err) {
					console.log(err)
					socket.emit('atualizar_estado_impresion_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('atualizar_estado_impresion_medicamentoEntregado', { mensaje: 'Se actualizó exitósamente el estado.' })
					
				MedicamentoEntregado.findById(data, (err, medicamentoEntregado) => {
					// console.log(medicamentoEntregado)

					if(err) {
						console.log(err)
						socket.emit('mostrar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_medicamentoEntregado', medicamentoEntregado[0])
				})

				medicamentosEntregados()
			})
		})

		// DATOS PARA EL REPORTE DE UN COMPROBANTE DE MEDOCAMENTOS ENTREGADOS
		// PARA IMPRIMIR Y HACER FIRMAR AL PACIENTE.
		socket.on('medicamentoEntregado_impresion', (data) => {
			MedicamentoEntregado.findById(data, (err, medicamentoEntregado) => {
				// console.log(medicamentoEntregado)
				let idMmedicamentoEntregado = medicamentoEntregado[0].medicamentoEntregado.id_medicamentoEntregado

				if(err) {
					console.log(err)
					socket.emit('medicamentoEntregado_impresion', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}


				MedicamentoXentregado.find(idMmedicamentoEntregado, (err, medicamentosAgregados) => {
					console.log(medicamentosAgregados)
					
					if(err) {
						console.log(err)
						socket.emit('medicamentoEntregado_impresion', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					medicamentoEntregado[0].medicamentos = medicamentosAgregados

					let longMedicamentosAgregados = medicamentosAgregados.length

					medicamentoEntregado[0].medicamentos.map((i) => {
						let idMmedicamento = i.medicamento.id_medicamento

						MedicamentoDroga.find(idMmedicamento , (err, drogas) => {
							if(err) {
								console.log(err)
								socket.emit('listar_medicamentos_lista_drogas', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
							}
							
							i.drogas = drogas

							if(i == medicamentosAgregados[longMedicamentosAgregados - 1]) {
								socket.emit('medicamentoEntregado_impresion', medicamentoEntregado[0])
							}
						})
					})

				})
			})
		})


		socket.on('disconnect', function () {
			console.log('Medicamento entregado Desconecto.')
		})
	})
}
