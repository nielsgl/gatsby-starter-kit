import React, { PureComponent } from "react";
import _ from "lodash";
import { Link } from "gatsby";

class PostCategories extends PureComponent {
	render() {
		console.log("PostCategories props", this.props);
		const { tags } = this.props;
		return (
			<div className="post-tag-container">
				{tags &&
					tags.map(tag => (
						<Link
							key={tag}
							style={{ textDecoration: "none" }}
							to={`/tags/${_.kebabCase(tag)}`}
						>
							<button type="button">{tag}</button>
						</Link>
					))}
			</div>
		);
	}
}

export default PostCategories;
