import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import Layout from "layout";
import UserInfo from "components/UserInfo/UserInfo";
// import Disqus from "../components/Disqus/Disqus";
// import PostTags from "components/PostTags/PostTags";
// import SocialLinks from "components/SocialLinks/SocialLinks";
// import SEO from "components/SEO/SEO";
// import PostCategories from "components/PostCategories/PostCategories";
import config from "../../data/config";
import "./b16-tomorrow-dark.css";
// import "prismjs/themes/prism-tomorrow.css";
import "./post.css";

// import "katex/dist/katex.min.css";

export default class NoteTemplate extends PureComponent {
	render() {
		const { data, pageContext } = this.props;
		const { slug } = pageContext;

		const postNode = data.jupyterNotebook;
		const post = postNode.frontmatter || {};
		if (!post.id) {
			post.id = slug;
		}
		if (!post.category_id) {
			post.category_id = config.postDefaultCategoryID;
		}

		return (
			<Layout>
				<div>
					<Helmet>
						<title>{`${post.title} | ${config.siteTitle}`}</title>
					</Helmet>
					{/* <SEO postPath={slug} postNode={postNode} postSEO /> */}
					<div>
						<h1>{post.title}</h1>
						{/* <div>{JSON.stringify(postNode.timeToRead)}</div> */}
						<div
							dangerouslySetInnerHTML={{ __html: postNode.html }}
						/>
						{/* <div className="post-meta">
							<PostTags tags={post.tags} />
							<PostCategories tags={post.tags} />
							<SocialLinks postPath={slug} postNode={postNode} />
						</div> */}
						<UserInfo config={config} />
						{/* <Disqus postNode={postNode} /> */}
					</div>
				</div>
			</Layout>
		);
	}
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
	query NotePostBySlug {
		jupyterNotebook {
			html
			# timeToRead
			# excerpt
			# frontmatter {
			# 	title
			# 	cover
			# 	date
			# 	category
			# 	tags
			# }
			fields {
				slug
				# date
			}
		}
	}
`;
