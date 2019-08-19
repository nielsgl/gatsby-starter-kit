import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import "../assets/scss/main.scss";
import Header from "./Header";

class Layout extends PureComponent {
	render() {
		const { children } = this.props;
		const siteTitle = "Niels van Galen Last";
		const siteDescription = "Niels's Website";

		return (
			<>
				<Helmet>
					<title>{siteTitle}</title>
					<meta name="description" content={siteDescription} />
				</Helmet>
				<div>
					<Header />
					{children}
				</div>
			</>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
