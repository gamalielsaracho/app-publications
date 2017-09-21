import LoteMedicamento from './loteMedicamento.model'

export default (io) => {
	var loteNsp = io.of('/loteMedicamento');
	
	loteNsp.on('connection', function (socket) {

		console.log('Lote medicamento Conectado.')

		function lotesMedicamentos() {
			LoteMedicamento.find((err, lotesMedicamentos) => {
				// console.log(lotesMedicamentos)
				if(err) {
					console.log(err)
					
					socket.emit('listar_lotesMedicamentos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				loteNsp.emit('listar_lotesMedicamentos', {
					lotesMedicamentos: lotesMedicamentos
				})
			})
		}
		
		lotesMedicamentos()


		socket.on('crear_loteMedicamento', function(data) {
			LoteMedicamento.verifyIfExist(data, (err, loteExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_loteMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(loteExistente[0]) {
						socket.emit('crear_loteMedicamento', { error: 'Este lote ya está registrado' })
						return
				} else {
					LoteMedicamento.create(data, (err, lote) => {
						if(err) {
							console.log(err)
							socket.emit('crear_loteMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_loteMedicamento', { mensaje: 'Se agregó exitósamente.' })
						
						lotesMedicamentos()
					})
				}
			})
		})


		socket.on('eliminar_loteMedicamento', (data) => {
			LoteMedicamento.delete(data, (err) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_loteMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('eliminar_loteMedicamento', { mensaje: 'Se Eliminó exitósamente.' })

				lotesMedicamentos()
			})
		})


		socket.on('mostrar_loteMedicamento_editar', (data) => {
			LoteMedicamento.findByIdToUpdate(data, (err, lote) => {
				// console.log(lote)
				if(err) {
					console.log(err)
					socket.emit('mostrar_loteMedicamento_editar', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_loteMedicamento_editar', lote[0])
			})
		})


		socket.on('editar_loteMedicamento', (data) => {
			// LoteMedicamento.verifyIfExist(data, (err, loteExistente) => {
			// 	if(err) {
			// 		console.log(err)
			// 		socket.emit('editar_loteMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
			// 		return
			// 	}

				// if(loteExistente[0]) {
				// 	socket.emit('editar_loteMedicamento', { error: 'Este lote ya está registrado' })
				// 	return
				// }
					
					
				LoteMedicamento.update(data, (err) => {
					if(err) {
						console.log(err)
						socket.emit('editar_loteMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('editar_loteMedicamento', { mensaje: 'Se actualizó exitósamente.' })
					
					lotesMedicamentos()
				})
			// })
		})
		
		socket.on('mostrar_loteMedicamento', (data) => {
			LoteMedicamento.findById(data, (err, lote) => {
				// console.log(lote)

				if(err) {
					console.log(err)
					socket.emit('mostrar_loteMedicamento', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_loteMedicamento', lote[0])
			})
		})



		socket.on('disconnect', function () {
			console.log('Lote medicamento Desconecto.')
		})
	})
}
