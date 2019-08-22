import React from "react";
import { Helmet } from "react-helmet";
import Layout from "layout";
import config from "../../data/config";

export default () => (
	<Layout>
		<div className="about-container">
			<Helmet title={`About | ${config.siteTitle}`} defer={false} />
			<h1>Ohnoes, you should not be here!</h1>
		</div>
	</Layout>
);
