import React, { Component } from "react";
import "./UserLinks.css";

class UserLinks extends Component {
	getLinkElements() {
		const {
			config: { userLinks },
			labeled,
		} = this.props;

		return userLinks.map(link => (
			<button key={link.label} href={link.url} type="button">
				{labeled ? link.label : ""}
			</button>
		));
	}

	render() {
		const {
			config: { userLinks },
		} = this.props;
		if (!userLinks) {
			return null;
		}
		return <div className="user-links">{this.getLinkElements()}</div>;
	}
}

export default UserLinks;
