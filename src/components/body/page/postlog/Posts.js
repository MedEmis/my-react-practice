import React from 'react'
import './postLog.scss';
import PostLog from './PostLog';





class Posts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		// if (this.props.location.currentUserId) {
		// 	this.userId = this.props.location.currentUserId || this.props.location.UserId
		// } else {
		// 	this.userId = currentUserId
		// }
		//console.log("Posts props", this.props)


	}
	render() {
		return (
			<>
				{
					this.props.currentUserId
						? <PostLog
							userId={this.props.currentUserId}
							userBase={this.props.userBase}
							postsBase={this.props.postsBase}
							currentPostText={this.props.currentPostText}
							dispatch={this.props.dispatch}
						/>
						: <h1><b>You don't have any posts yet</b></h1>
				}
			</>
		);
	}
}
export default Posts;