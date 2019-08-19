import React, { PureComponent } from "react";
// import PropTypes from "prop-types";
import Footer from "./Footer";

class Header extends PureComponent {
	render() {
		return (
			<header id="header">
				<div className="inner">
					<a href="/" className="image avatar">
						{/* <img src={avatar} alt="" /> */}
					</a>
					<h1>
						<strong>I am Strata</strong>, a super simple
						<br />
						responsive site template freebie
						<br />
						crafted by <a href="http://html5up.net">HTML5 UP</a>.
					</h1>
				</div>
				<Footer />
			</header>
		);
	}
}

Header.propTypes = {};

export default Header;
