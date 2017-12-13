import React, { Component } from 'react'
import { Link } from 'react-router'


class Estadistica1 extends Component {
	constructor(props) {
		super(props)
	}

	updateChart(datosProps) {
		if(datosProps) {
			// let datos = datosProps[0]
			console.log('desde componentDidMount')
			console.log(datosProps)

		  let chartCanvas = this.refs.chart;

		  let myChart = new Chart(chartCanvas, {
		    type: 'line',
		    data: {
				labels: datosProps.labels,
		    	datasets: [{
			        label: datosProps.descripcion,
			        data: datosProps.data,
			        backgroundColor: [
			            'rgba(255, 99, 132, 0.2)',
			            'rgba(54, 162, 235, 0.2)',
			            'rgba(255, 206, 86, 0.2)',
			            'rgba(75, 192, 192, 0.2)',
			            'rgba(153, 102, 255, 0.2)',
			            'rgba(255, 159, 64, 0.2)'
			        ],
			        borderColor: [
			        	'rgba(255,99,132,1)',
			        	'rgba(54, 162, 235, 1)',
			        	'rgba(255, 206, 86, 1)',
			        	'rgba(75, 192, 192, 1)',
			        	'rgba(153, 102, 255, 1)',
			        	'rgba(255, 159, 64, 1)'
			        ],
			        borderWidth: 1
			    }]
	    	},
		    options: {
		    	scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true,
		                    // min: 0,
					        stepSize: 1
					        // max: 4
		                }
		            }]
	        	}
		    }
		  });
			
		}
	}

	
	componentDidMount () {
		this.updateChart(this.props.datos)
	}

	componentDidUpdate (prevProps, prevState) {
		if(prevProps.valoresFiltro.id_diagnostico !== this.props.valoresFiltro.id_diagnostico) {
			this.updateChart(this.props.datos)
		}
		// console.log('prevProps valoresFiltro')

		// console.log(prevProps.valoresFiltro)
		// console.log('this.props.valoresFiltro')

		// console.log(this.props.valoresFiltro)
	}

	// componentWillUnmount() {
	// 	console.log("componentWillUnmount.")
	// }
	
	render() {
		// console.log('this.props.mostrar')
		// console.log(this.props.mostrar.consulta)

		return <div className='row'>
			<div className='col-xs-12 col-sm-10 col-md-10 col-lg-10'>
				<canvas ref={'chart'} height={'400'} width={'600'}></canvas>
			</div>
		</div>
	}
}

export default Estadistica1