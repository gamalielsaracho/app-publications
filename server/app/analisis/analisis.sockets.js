import Analisis from './analisis.model'

import referentialIntegritySimple from './././../validations/referentialIntegritySimple.js'

import AnalisisTipo from '../analisisTipo/analisisTipo.model'
import AnalisisTipoReferencia from '../analisisTipoReferencia/analisisTipoReferencia.model'

export default (io) => {
	var analisisNsp = io.of('/analisis');
	
	analisisNsp.on('connection', function (socket) {

		console.log('Analisis Conectado.')

		function analisisLista() {
			Analisis.find((err, analisisLista) => {
				// console.log(analisisLista)
				if(err) {
					console.log(err)
					
					socket.emit('listar_analisis', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				analisisNsp.emit('listar_analisis', { 
					analisisLista: analisisLista 
				})
			})
		}
		
		analisisLista()


		socket.on('mostrar_por_idAnalisisSolicitado', (data) => {

			Analisis.findByIdanalisisSolicitado(data, (err, analisis) => {
				// console.log(analisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_por_idAnalisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_por_idAnalisisSolicitado', analisis)
			})
		})


		socket.on('crear_analisis', function(data) {
			// console.log(data)
			Analisis.verifyIfExist(data, (err, analisisExistente) => {
				if(err) {
					console.log(err)
					socket.emit('crear_analisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				console.log(analisisExistente[0])

				if(analisisExistente[0]) {
						socket.emit('crear_analisis', { error: 'Solo está permitido crear un analisis por cada solicitud.' })
						return
				} else {
					Analisis.create(data, (err, result) => {
						if(err) {
							console.log(err)
							socket.emit('crear_analisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('crear_analisis', { 
							// para redireccionar al análisis que creó. 
							id_analisis: result.insertId,
							id_analisisSolicitado: data.id_analisisSolicitado,
							mensaje: 'Se agregó exitósamente.' 
						})
						
						Analisis.findByIdanalisisSolicitado(data, (err, analisis) => {
							if(err) {
								console.log(err)
								socket.emit('mostrar_por_idAnalisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('mostrar_por_idAnalisisSolicitado', analisis)
						})

						analisisLista()
					})
				}
			})
		})


		socket.on('eliminar_analisis', (data) => {
			referentialIntegritySimple('analisistipos', 'id_analisis', data.id_analisis, (err, enUso) => {
				if(err) {
					console.log(err)
					socket.emit('eliminar_analisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				if(enUso[0]) {
					socket.emit('eliminar_analisis', { error: 'Este dato está siendo usado por otros registros.' })
				} else {
					Analisis.delete(data, (err) => {
						if(err) {
							console.log(err)
							socket.emit('eliminar_analisis', { error: 'Ocurrió un error, intente más tarde.' })
							return
						}

						socket.emit('eliminar_analisis', { mensaje: 'Se Eliminó exitósamente.' })

						Analisis.findByIdanalisisSolicitado(data, (err, analisis) => {
							if(err) {
								console.log(err)
								socket.emit('mostrar_por_idAnalisisSolicitado', { error: 'Ocurrió un error, intente más tarde.' })
								return
							}

							socket.emit('mostrar_por_idAnalisisSolicitado', analisis)
						})

						analisisLista()
					})
				}
			})

		})


		// Acutalizar el estado de impreso a true.
		
		socket.on('actualizar_analisis_estadoImpreso', (data) => {
			Analisis.updatePrinted(data, (err, content) => {
				// console.log(analisis)

				if(err) {
					console.log(err)
					socket.emit('actualizar_analisis_estadoImpreso', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				Analisis.findById(data, (err, analisis) => {
				// console.log(analisis)

					if(err) {
						console.log(err)
						socket.emit('mostrar_analisis', { error: 'Ocurrió un error, intente más tarde.' })
						return
					}

					socket.emit('mostrar_analisis', analisis[0])
				})

				// socket.emit('actualizar_analisis_estadoImpreso', { 
				// 	mensaje: 'Se actualizó exitósamente.'
				// })
			})
		})


		socket.on('mostrar_analisis', (data) => {
			Analisis.findById(data, (err, analisis) => {
				// console.log(analisis)

				if(err) {
					console.log(err)
					socket.emit('mostrar_analisis', { error: 'Ocurrió un error, intente más tarde.' })
					return
				}

				socket.emit('mostrar_analisis', analisis[0])
			})
		})


		socket.on('mostrar_analisis_vista_previa', (data) => {

			Analisis.preview(data, (err, analisis) => {
				// console.log(analisis)
				analisis = analisis[0]
				
				if(err) {
					console.log(err)
					return res.status(422).json({ error: 'Lo sentimos, acurrió un error. intente más tarde.' });
				}

				analisis.anlisisTipos = []

				AnalisisTipo.find(data.id_analisis, (err, anlisisTipos) => {
					if(err) {
						console.log(err)
						socket.emit('mostrar_analisis_vista_previa', { error: 'Ocurrió un error, intente más tarde.' })
					}

					let longAnlisisTipos = anlisisTipos.length

					anlisisTipos.map((i) => {
						// i.referencias = []

						AnalisisTipoReferencia.find(i.analisisTipo.id_analisisTipo, (err, referencias) => {

							if(err) {
								console.log(err)
								socket.emit('mostrar_analisis_vista_previa', { error: 'Ocurrió un error, intente más tarde.' })
							}


							i.referencias = referencias
							analisis.anlisisTipos.push(i)

							if(i == anlisisTipos[longAnlisisTipos-1]) {
								// return res.json(analisis)
								socket.emit('mostrar_analisis_vista_previa', analisis)
							}
						})
					})
				})
			})

		})


		socket.on('disconnect', function () {
			console.log('Analisis Desconecto.')
		})
	})
}
