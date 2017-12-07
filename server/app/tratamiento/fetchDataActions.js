import Tratamiento from './tratamiento.model'


export default (nsp, socket) => {

	return {
		listarTratamientos: () => {
			Tratamiento.find((err, tratamientos) => {
				// console.log(tratamientos)
				if(err) {
					console.log(err)
						
					socket.emit('listar_tratamientos', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				nsp.emit('listar_tratamientos', { 
					tratamientos: tratamientos 
				})
			})
		},

		mostrarTratamientoByIdConsulta: (data) => {
			Tratamiento.findByIdConsulta(data, (err, tratamiento) => {
				// console.log(tratamiento)
				if(err) {
					console.log(err)
						
					socket.emit('mostrar_tratamiento_idConsulta', { error: 'Lo sentimos, acurrió un error. intente más tarde.' })
					return
				}

				// console.log('mostrar_tratamiento_idConsulta')
				// console.log(tratamiento[0])

				// Lo mostrarmos de esta manera tratamiento: tratamiento[0]
				// porque a la hora de obtener en el cliente y verificar
				// data.error da error porporque si No encuenta el tratamiento
				// por IdConsulta retorna null el servidor.
				// y null no es un Objeto. 
				nsp.emit('mostrar_tratamiento_idConsulta', { 
					tratamiento: tratamiento[0]
				})
			})
		}
		
	}
}