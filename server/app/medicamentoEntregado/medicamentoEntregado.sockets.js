import MedicamentoEntregado from './medicamentoEntregado.model'

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
			MedicamentoEntregado.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_medicamentoEntregado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_medicamentoEntregado', { mensaje: 'Se Eliminó exitósamente.' })

				medicamentosEntregados()
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



		socket.on('disconnect', function () {
			console.log('Medicamento entregado Desconecto.')
		})
	})
}
