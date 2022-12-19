import React from "react";
import "@styles/dock.scss";
import FinderIcon from "@static/finder.png";
import CodeIcon from "@static/code.png";
import GithubIcon from "@static/github.png";
import twitterIcon from "@static/twitterIcon.png";
import FolderIcon from "@static/folder.png";
import LinkedInIcon from "@static/LinkedInIcon.png";
import { Link } from "react-router-dom";


const DockContent = () => {
	return (
		<div className="main-contain">
			<div className="container">
				<div className="dock">
					<span></span>
					<div className="dock-nav">
						<ul>
							<Link to="/">
								<li
									data-title="Home"
									className="full-width-icon"
								>
									<img
										src={FinderIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
							<Link to="/vscode">
								<li data-title="VS Code">
									<img
										src={CodeIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
							<Link to="/git">
								<li data-title="Git Log">
									<img
										src={GithubIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
							<a href="https://twitter.com/aadityatwt">
								<li data-title="Twitter">
									<img
										src={twitterIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</a>
							<a href="https://www.linkedin.com/in/aditya-sharma-47b787201">
								<li data-title="LinkedIn">
									<img
										src={LinkedInIcon}
										className="img-fluid"
										alt="dope"
									/>
								</li>
							</a>
							<div className="separator" />
							<Link to="/resume">
								<li data-title="Resume">
									<img
										src={FolderIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DockContent;