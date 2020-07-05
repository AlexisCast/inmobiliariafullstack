import React, { Component } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import BarSession from "./bar/BarSession";

export default class AppNavbar extends Component {
	render() {
		return (
			<div>
				<AppBar position="static">
					<BarSession />
				</AppBar>
			</div>
		);
	}
}
