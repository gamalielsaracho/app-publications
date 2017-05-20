import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {
	render() {
		return <div>
			<nav className='light-blue lighten-2'>
			    <div className="nav-wrapper container">
				    <div className='row'>
					    <div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
					      <a href="/" className="brand-logo">Logo</a>
					    </div>
					    <div className='col-xs-12 col-sm-8 col-md-6 col-lg-6'>
						   <ul id="nav-mobile" className="right hide-on-med-and-down ">
								<li><Link to='/registrarse'>Registrarse</Link></li>
								<li><a href="badges.html">Components</a></li>
								<li><a href="collapsible.html">JavaScript</a></li>
						   </ul>
					    </div>
				    </div>
			    </div>
		  	</nav>
			{this.props.children}
		</div>
	}
}

export default App