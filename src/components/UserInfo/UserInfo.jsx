import React, { PureComponent } from "react";
import { Follow } from "react-twitter-widgets";

class UserInfo extends PureComponent {
	render() {
		const {
			config: { userTwitter },
			expanded,
		} = this.props;
		// const { expanded } = this.props;
		return (
			<Follow
				username={userTwitter}
				options={{ count: expanded ? true : "none" }}
			/>
		);
	}
}

export default UserInfo;
