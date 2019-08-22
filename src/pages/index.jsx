import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/config";

class Index extends PureComponent {
	render() {
		const {
			data: {
				allMarkdownRemark: { edges },
			},
		} = this.props;
		return (
			<Layout>
				<div className="index-container">
					<Helmet title={config.siteTitle} defer={false} />
					<SEO />
					<h1>Index</h1>
					<PostListing postEdges={edges} />
				</div>
			</Layout>
		);
	}
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					fields {
						slug
						date
					}
					excerpt
					timeToRead
					frontmatter {
						title
						tags
						cover
						date
					}
				}
			}
		}
	}
`;
