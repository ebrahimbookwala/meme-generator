import React, { Component } from "react";

export class MemeGenerator extends Component {
	state = {
		topText: "",
		bottomText: "",
		randomImage: "https://i.imgflip.com/26am.jpg",
		allMemeImgs: [],
	};

	handleTextInput = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
		const randUrl = this.state.allMemeImgs[randNum].url;
		this.setState({ randomImage: randUrl });
	};

	componentDidMount() {
		fetch("https://api.imgflip.com/get_memes")
			.then((response) => response.json())
			.then((res) => this.setState({ allMemeImgs: res.data.memes }));
	}

	render() {
		return (
			<div className="meme-container">
				<form onSubmit={this.handleFormSubmit}>
					<input
						type="text"
						name="topText"
						placeholder="Add Top Text"
						value={this.state.topText}
						onChange={this.handleTextInput}
					/>

					<input
						type="text"
						name="bottomText"
						placeholder="Add Bottom Text"
						value={this.state.bottomText}
						onChange={this.handleTextInput}
					/>
					<button type="submit">Generate</button>
				</form>
				<div className="meme">
					<img src={this.state.randomImage} alt="" />
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText}</h2>
				</div>
			</div>
		);
	}
}

export default MemeGenerator;
