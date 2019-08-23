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
				allJupyterNotebook: { edges },
			},
		} = this.props;
		return (
			<Layout>
				<div className="index-container">
					<Helmet title={config.siteTitle} defer={false} />
					{/* <SEO /> */}
					<h1>Foo</h1>
					{/* <PostListing postEdges={edges} /> */}
					<pre>{JSON.stringify(edges, null, " ")}</pre>
					<div
						dangerouslySetInnerHTML={{ __html: edges[0].node.html }}
					/>
				</div>
			</Layout>
		);
	}
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query FooIndexQuery {
		allJupyterNotebook(limit: 2000) {
			edges {
				node {
					id
					metadata {
						kernelspec {
							name
							language
							display_name
						}
					}
					html
					json {
						nbformat
						nbformat_minor
						cells {
							cell_type
							execution_count
						}
					}
					internal {
						content
					}
					fileAbsolutePath
				}
			}
			totalCount
		}
	}
`;
