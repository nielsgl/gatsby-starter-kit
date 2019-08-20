import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends PureComponent {
	render() {
		const {
			pageContext: { category },
			data: {
				allMarkdownRemark: { edges },
			},
		} = this.props;
		return (
			<Layout>
				<div className="category-container">
					<Helmet
						title={`Posts in category "${category}" | ${config.siteTitle}`}
						defer={false}
					/>
					<PostListing postEdges={edges} />
				</div>
			</Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query CategoryPage($category: String) {
		allMarkdownRemark(
			limit: 1000
			sort: { fields: [fields___date], order: DESC }
			filter: { frontmatter: { category: { eq: $category } } }
		) {
			totalCount
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
