import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import config from "../../data/config";
import "./index.css";

export default class Layout extends PureComponent {
	render() {
		const { children } = this.props;
		return (
			<div>
				<Helmet>
					<html lang="en" />
					<meta name="description" content={config.siteDescription} />
				</Helmet>
				<Link to="/">Home</Link>&nbsp;
				<Link to="/blog">Blog</Link>&nbsp;
				<Link to="/about">About</Link>&nbsp;
				<Link to="/foo">Foo</Link>
				{children}
			</div>
		);
	}
}
