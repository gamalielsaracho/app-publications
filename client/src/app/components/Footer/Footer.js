import React, { Component } from 'react'
import { Link } from 'react-router'

class Footer extends Component {
	render() {
		var coter = {
			border: '1px solid red'
		}

		return <footer id='cantactanos' className='container-fluid container-max #03a9f4 light-blue'>
			<br/>
			<div className='row center-lg center-md center-sm center-xs'>
				<div className='col-xs-12 col-sm-5 col-md-5 col-lg-2'>
					<div className='logo-container'>
						<img src='http://localhost:8080/images/logo.jpg'/>
					</div>
					<h5 className='center'>USF</h5>
				</div>
			</div>

			<div className='row middle-lg middle-md middle-sm center-xs'>
				
				<div className='col-xs-12 col-sm-6 col-md-5 col-lg-3 container'>
					
					<div className='foteer__container-icon-descripcion'>
						<div className='foteer__container__icon'>
							<span className="foteer__icon icon-mail4"></span>
						</div>
						<div className='foteer__container__descripcion'>
							<p className='foteer__descripcion'>usf@gmail.com</p>
						</div>
					</div>
					<div className='foteer__container-icon-descripcion'>
						<div className='foteer__container__icon'>
							<span className="foteer__icon icon-facebook"></span>
						</div>
						<div className='foteer__container__descripcion'>
							<p className='foteer__descripcion'>facebook/usf</p>
						</div>
					</div>
					<div className='foteer__container-icon-descripcion'>
						<div className='foteer__container__icon'>
							<span className="foteer__icon icon-twitter"></span>
						</div>
						<div className='foteer__container__descripcion'>
							<p className='foteer__descripcion'>twitter/usf</p>
						</div>
					</div>
					<div className='foteer__container-icon-descripcion'>
						<div className='foteer__container__icon'>
							<span className="foteer__icon icon-phone"></span>
						</div>
						<div className='foteer__container__descripcion'>
							<p className='foteer__descripcion'>071-111-876</p>
						</div>
					</div>

				</div>

				<div className='col-xs-12 col-sm-6 col-md-5 col-lg-3 container'>
					<div className='row center-lg center-md center-sm center-xs'>
						<div className='col-xs-4 col-sm-3 col-md-3 col-lg-3 container'>
							<p className='footer__link center'>Home</p>
						</div>
						<div className='col-xs-4 col-sm-3 col-md-3 col-lg-3 container'>
							<p className='footer__link center'>Nosotros</p>
						</div>
						<div className='col-xs-4 col-sm-3 col-md-3 col-lg-3 container'>
							<p className='footer__link center'>Servicios</p>
						</div>
						<div className='col-xs-4 col-sm-3 col-md-3 col-lg-3 container'>
							<p className='footer__link center'>Horarios</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	}
}

export default Footer