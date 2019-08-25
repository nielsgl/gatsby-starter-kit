/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");

const { createFilePath } = require("gatsby-source-filesystem");

const siteConfig = require("./data/config");

const sortMDNotes = edges => {
	edges.sort((postA, postB) => {
		const dateA = moment(
			postA.node.frontmatter.date,
			siteConfig.dateFromFormat
		);

		const dateB = moment(
			postB.node.frontmatter.date,
			siteConfig.dateFromFormat
		);

		if (dateA.isBefore(dateB)) return 1;
		if (dateB.isBefore(dateA)) return -1;

		return 0;
	});
};

const createMDPages = (edges, categorySet, tagSet, createPage, page) => {
	edges.forEach((edge, index) => {
		if (edge.node.frontmatter.tags) {
			edge.node.frontmatter.tags.forEach(tag => {
				tagSet.add(tag);
			});
		}

		if (edge.node.frontmatter.category) {
			categorySet.add(edge.node.frontmatter.category);
		}

		const nextID = index + 1 < edges.length ? index + 1 : 0;
		const prevID = index - 1 >= 0 ? index - 1 : edges.length - 1;
		const nextEdge = edges[nextID];
		const prevEdge = edges[prevID];

		createPage({
			path: edge.node.fields.slug,
			component: page,
			context: {
				slug: edge.node.fields.slug,
				nexttitle: nextEdge.node.frontmatter.title,
				nextslug: nextEdge.node.fields.slug,
				prevtitle: prevEdge.node.frontmatter.title,
				prevslug: prevEdge.node.fields.slug,
			},
		});
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	let slug;
	if (node.internal.type === "MarkdownRemark") {
		const fileNode = getNode(node.parent);
		const parsedFilePath = path.parse(fileNode.relativePath);
		if (
			Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
		) {
			slug = `/${_.kebabCase(node.frontmatter.title)}`;
		} else if (
			parsedFilePath.name !== "index" &&
			parsedFilePath.dir !== ""
		) {
			slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
		} else if (parsedFilePath.dir === "") {
			slug = `/${parsedFilePath.name}/`;
		} else {
			slug = `/${parsedFilePath.dir}/`;
		}

		if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
			if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
				slug = `/${_.kebabCase(node.frontmatter.slug)}`;
			if (
				Object.prototype.hasOwnProperty.call(node.frontmatter, "date")
			) {
				const date = moment(
					node.frontmatter.date,
					siteConfig.dateFromFormat
				);
				if (!date.isValid)
					console.warn("WARNING: Invalid date.", node.frontmatter);

				createNodeField({
					node,
					name: "date",
					value: date.toISOString(),
				});
			}
		}

		createNodeField({ node, name: "slug", value: `/blog${slug}` });
	}
	if (node.internal.type === "JupyterNotebook") {
		const filename = path.parse(node.fileAbsolutePath);

		createNodeField({
			node,
			name: "slug",
			value: `/notes/${filename.name.replace(/_/gi, "-")}/`,
		});
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const postPage = path.resolve("src/templates/post.jsx");
	const notePage = path.resolve("src/templates/note.jsx");
	const tagPage = path.resolve("src/templates/tag.jsx");
	const categoryPage = path.resolve("src/templates/category.jsx");

	const markdownQueryResult = await graphql(
		`
			{
				allMarkdownRemark {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
								tags
								category
								date
							}
						}
					}
				}
			}
		`
	);

	const mdNotesQueryResult = await graphql(
		`
			{
				allMarkdownRemark(
					filter: { fileAbsolutePath: { regex: "/blog/" } }
				) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
								tags
								category
								date
							}
						}
					}
				}
			}
		`
	);

	const notesQueryResult = await graphql(`
		{
			allJupyterNotebook {
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
						fields {
							slug
						}
					}
				}
				# totalCount
			}
		}
	`);

	if (markdownQueryResult.errors) {
		console.error("ERROR", markdownQueryResult.errors);
		throw markdownQueryResult.errors;
	}

	if (mdNotesQueryResult.errors) {
		console.error("ERROR", mdNotesQueryResult.errors);
		throw mdNotesQueryResult.errors;
	}

	const tagSet = new Set();
	const categorySet = new Set();

	const noteSet = new Set();

	const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

	const mdNotesEdges = mdNotesQueryResult.data.allMarkdownRemark.edges;

	const notesEdges = notesQueryResult.data.allJupyterNotebook.edges;

	// postsEdges.sort((postA, postB) => {
	// 	const dateA = moment(
	// 		postA.node.frontmatter.date,
	// 		siteConfig.dateFromFormat
	// 	);

	// 	const dateB = moment(
	// 		postB.node.frontmatter.date,
	// 		siteConfig.dateFromFormat
	// 	);

	// 	if (dateA.isBefore(dateB)) return 1;
	// 	if (dateB.isBefore(dateA)) return -1;

	// 	return 0;
	// });

	sortMDNotes(postsEdges);
	sortMDNotes(mdNotesEdges);

	// postsEdges.forEach((edge, index) => {
	// 	if (edge.node.frontmatter.tags) {
	// 		edge.node.frontmatter.tags.forEach(tag => {
	// 			tagSet.add(tag);
	// 		});
	// 	}

	// 	if (edge.node.frontmatter.category) {
	// 		categorySet.add(edge.node.frontmatter.category);
	// 	}

	// 	const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
	// 	const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
	// 	const nextEdge = postsEdges[nextID];
	// 	const prevEdge = postsEdges[prevID];

	// 	createPage({
	// 		path: edge.node.fields.slug,
	// 		component: postPage,
	// 		context: {
	// 			slug: edge.node.fields.slug,
	// 			nexttitle: nextEdge.node.frontmatter.title,
	// 			nextslug: nextEdge.node.fields.slug,
	// 			prevtitle: prevEdge.node.frontmatter.title,
	// 			prevslug: prevEdge.node.fields.slug,
	// 		},
	// 	});
	// });

	createMDPages(postsEdges, categorySet, tagSet, createPage, postPage);

	tagSet.forEach(tag => {
		createPage({
			path: `/tags/${_.kebabCase(tag)}/`,
			component: tagPage,
			context: {
				tag,
			},
		});
	});
	categorySet.forEach(category => {
		createPage({
			path: `/categories/${_.kebabCase(category)}/`,
			component: categoryPage,
			context: {
				category,
			},
		});
	});

	// console.log("NOTE", notesEdges[0].node);
	// console.log("NOTE", notesEdges[0].node.fields);

	notesEdges.forEach(note => {
		createPage({
			path: note.node.fields.slug,
			component: notePage,
			context: { note },
		});
	});
};
