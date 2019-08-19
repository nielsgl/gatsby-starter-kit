import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Header from "./Header";

class Layout extends PureComponent {
	render() {
		const { children } = this.props;

		return (
			<div>
				<Header />
				{children}
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
