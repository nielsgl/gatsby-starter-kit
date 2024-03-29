import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "layout";
import PostListing from "components/PostListing/PostListing";
import config from "../../data/config";

export default class TagTemplate extends PureComponent {
	render() {
		const {
			pageContext: { tag },
			data: {
				allMarkdownRemark: { edges },
			},
		} = this.props;
		// const postEdges = this.props.data.allMarkdownRemark.edges;
		return (
			<Layout>
				<div className="tag-container">
					<Helmet
						title={`Posts tagged as "${tag}" | ${config.siteTitle}`}
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
	query TagPage($tag: String) {
		allMarkdownRemark(
			limit: 1000
			sort: { fields: [fields___date], order: DESC }
			filter: { frontmatter: { tags: { in: [$tag] } } }
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
