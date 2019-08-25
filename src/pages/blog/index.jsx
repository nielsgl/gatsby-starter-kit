import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import SEO from "components/SEO/SEO";
import Layout from "layout";
import PostListing from "components/PostListing/PostListing";
// import PostListing from "../../components/PostListing/PostListing";

import config from "../../../data/config";

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
					<h1>Blog</h1>
					<PostListing postEdges={edges} />
				</div>
			</Layout>
		);
	}
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query BlogIndexQuery {
		allMarkdownRemark(
			limit: 2000
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { fileAbsolutePath: { regex: "//blog//" } }
		) {
			edges {
				node {
					excerpt
					timeToRead
					fields {
						slug
						date
					}
					frontmatter {
						title
						cover
						date
						category
						tags
					}
					fileAbsolutePath
					wordCount {
						paragraphs
						sentences
						words
					}
				}
			}
			totalCount
			pageInfo {
				perPage
			}
		}
	}
`;
