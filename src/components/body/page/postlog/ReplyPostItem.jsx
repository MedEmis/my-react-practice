import React from 'react'
import NestedReplyPostItem from './NestedReplyPostItem';
import './postItem.scss';
let classNames = require('classnames');




class ReplyPostItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVoted: false,
			IsTextOpen: false,
			postsBlock: props.childReply

		};
		//console.log('ReplypostItem ', this.state.postsBlock)

	}
	panelColor = () => {
		if (this.props.likes > this.props.dislikes) {
			this.panColor = {
				background: 'rgb(20, 77, 2)'
			};
		} else if (this.props.likes < this.props.dislikes) {
			this.panColor = {
				background: 'rgb(107, 11, 11)'
			};
		} else {
			this.panColor = {
				background: 'rgb(105, 85, 17)'
			};
		}
	}
	isVoutedCheck = (event) => {
		console.log("isVouted before", this.state.isVoted)
		if (this.state.isVoted === false) {
			this.props.likeIncrementState(event)
			this.setState({ isVoted: true })
		} else if (this.state.isVoted === true) {
			return
		}
	}
	render() {
		return (
			<>
				<div className="hero-posts-log-item reply">
					<img className="hero-posts-log-item_avatar" src={this.props.userBase[this.props.userId].avatarUrl} alt="avatar" />
					<div className="hero-posts-log-item__title">
						<div className="hero-posts-log-item__title-from">From: {!this.props.nikName ? " Anonymous" : this.props.nikName}</div>
						<div className="hero-posts-log-item__title-date">{this.props.userId}&nbsp;&nbsp;&nbsp;Date: {!this.props.dataDate ? "--.--.--" : this.props.dataDate}  /   At: {!this.props.dataTime ? "--:--" : this.props.dataTime}</div>
						<div className="hero-posts-log-item__title-log-id">log id: {this.props.id}</div>
					</div>
					<div className="hero-posts-log-item__body">
						<div className="hero-posts-log-item__body-text">{!this.props.textBody ? "...no text" : this.props.textBody}</div>
						<ul onLoad={this.panelColor()} style={this.panColor} className="hero-posts-log-item__body-special-list" >
							<li onClick={(event) => { this.isVoutedCheck(event) }}
								name="like" className="hero-posts-log-item__body-special-item tooltip"><span className="tooltiptext">Thumbs Up</span></li>
							<li onClick={(event) => { this.isVoutedCheck(event) }}
								name="dislike" className="hero-posts-log-item__body-special-item tooltip"><span className="tooltiptext">Thumbs Down</span></li>
							<li className="hero-posts-log-item__body-special-item tooltip">{this.props.likes}<span className="tooltiptext">Likes</span></li>
							<li className="hero-posts-log-item__body-special-item tooltip">{this.props.dislikes}<span className="tooltiptext">Dislikes</span></li>
						</ul>
					</div>
					<button onClick={() => this.setState({ IsTextOpen: true })} type="submit" className="hero-posts-log-item__button-reply">Reply</button>
					<div className={classNames(" body-page__reply-textarea", { " visible": this.state.IsTextOpen })}>
						<textarea onInput={this.props.auto_growFunc} className="body-page__reply-textarea-input" type="text" defaultValue={`Answer to ${this.props.nikName} :---`} />
						<div className="body-page__reply-textarea-buttons">
							<button onClick={() => this.setState({ IsTextOpen: false })} type="submit" className="red-btn" id="neon-text">Close</button>
							<button onClick={(event) => {
								this.props.nestReplyFunc(
									this.props.userId,
									this.props.initialUser,
									this.props.initialPost,
									this.props.id,
									this.props.userBase[this.props.userId].name,
									event
								)
								this.setState({ IsTextOpen: false })
								this.setState({ refresh: true })

							}
							} type="submit" className="blue-btn" id="neon-text">Publish</button>
						</div>
					</div>
				</div>
				<div className="body-page__hero-posts-log-nested-reply-wrapper">
					{
						(this.state.postsBlock !== undefined && this.state.postsBlock !== null)
							? this.state.postsBlock.map((item, index) => (item ? <NestedReplyPostItem
								ref={this.child}
								key={Math.floor(Math.random() * 10000)}
								id={this.state.postsBlock[index].id}
								userId={this.state.postsBlock[index].userId}
								userBase={this.props.userBase}
								nikName={this.state.postsBlock[index].nikName}
								dataDate={this.state.postsBlock[index].dataDate}
								dataTime={this.state.postsBlock[index].dataTime}
								textBody={this.state.postsBlock[index].textBody}
								likes={this.state.postsBlock[index].like}
								dislikes={this.state.postsBlock[index].dislike}
								childReply={this.state.postsBlock[index].nestedReply}
								nestReplyFunc={this.props.nestReplyFunc}
								auto_growFunc={this.props.auto_growFunc}
								props={this.props}
								likeIncrementState={this.props.likeIncrementState}
							/> : null))
							: null
					}
				</div>
			</>
		);
	}
}
export default ReplyPostItem;