import React, { PureComponent } from "react";
import _ from "lodash";
import { Link } from "gatsby";

class PostTags extends PureComponent {
	render() {
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

export default PostTags;
