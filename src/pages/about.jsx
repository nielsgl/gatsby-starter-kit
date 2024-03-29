import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import Layout from "layout";
import About from "components/About/About";
import config from "../../data/config";

class AboutPage extends PureComponent {
	render() {
		return (
			<Layout>
				<div className="about-container">
					<Helmet
						title={`About | ${config.siteTitle}`}
						defer={false}
					/>
					<About />
				</div>
			</Layout>
		);
	}
}

export default AboutPage;
