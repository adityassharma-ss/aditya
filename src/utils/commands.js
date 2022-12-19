import neofetch from "@utils/neofetch";
//eslint-disable-next-line

const compileResponseHTML = styleMap => {
	return styleMap
		.map(item => {
			return `<span class="${
				item.folder
					? `style3`
					: `${item.executable ? `style2` : `style1`}`
			}">${
				item.link
					? `<a target="_blank" href="${item.link}">${item.name}</a>`
					: `${item.name}`
			}</span>`;
		})
		.join("  ");
};

const getSpaces = commandList => {
	let defaultSpaces = "\t";
	let lengthList = commandList.map(item => {
		return item.name.length;
	});
	// console.log(commandList)
	let max = Math.max(...lengthList);
	let what = commandList.map(item => {
		return Array(max - item.name.length + 1).join(" ") + defaultSpaces;
	});
	return what;
};

const compileCommandHTML = commandList => {
	let defArgs = [
		{
			name: "ls",
			description: "lists directory content",
		},
		{
			name: "cd",
			description: "changes the current working directory",
		},
		{
			name: "clear",
			description: "clears the terminal screen",
		},
	];
	let argList = [
		...defArgs,
		...commandList.map(item => {
			let extra = " ";
			if (item.subPathStrict[0]) {
				extra += item.subPathStrict[1].name;
			}
			return {
				name: item.name[0] + extra,
				description: item.description,
			};
		}),
	];
	let spaceList = getSpaces(argList);
	let response = `These shell commands are defined internally.
Type <span class="style2">'help'</span> to see this list.\n\n`;
	argList.forEach((item, idx) => {
		let temp = `<span class="style2">${item.name}</span>${spaceList[idx]}${item.description}\n`;
		response += temp;
	});
	return `${response}\nAnd more "hidden" commands...`;
};

let commandList = [
	{
		name: ["resume", "./resume", "resume.sh", "./resume.sh"],
		action: { RESUME: "" },
		response: "",
		subPathStrict: [false],
		description: "view my resume",
	},
	{
		name: ["projects", "./projects", "projects.app", "./projects.app"],
		// action: { PROJECTS: "" },
		action: false,
		response: "Under construction 🚧🔨",
		subPathStrict: [false],
		description: "checkout my projects",
	},
	{
		name: ["neofetch"],
		action: false,
		response: `<pre>${neofetch}</pre>`,
		subPathStrict: [false],
		description:
			"displays information about me in an aesthetic and visually pleasing way.",
	},
	{
		name: ["code"],
		action: true,
		response: "",
		subPathStrict: [true, { name: ".", response: "" }],
		description: "opens a VS code window for this website's source code",
	},
	{
		name: ["danger"],
		action: true,
		response: "",
		subPathStrict: [false],
		description: '<span class="style7">¯\\_(ツ)_/¯</span>',
	},
	{
		name: ["git"],
		action: true,
		response: "",
		subPathStrict: [true, { name: "log", response: "" }],
		description: "lists my github projects",
	},
	{
		name: ["twitter"],
		action: true,
		response: 'Visit: <a href="https://twitter.com/aadityatwt">aadityatwt</a>',
		subPathStrict: [false],
		description: "checkout my Twitter profile",
	  },
	  {
		name: ["github"],
		action: true,
		response: 'Visit: <a href="https://github.com/adityassharma-ss">aditya</a>',
		subPathStrict: [false],
		description: "checkout my github profile",
	  },
	  {
		name: ["linkedin"],
		action: true,
		response: 'Visit: <a href="https://www.linkedin.com/in/aditya-sharma-47b787201/">LinkedIn</a>',
		subPathStrict: [false],
		description: "checkout my github profile",
	  },
	{
		name: ["help"],
		action: true,
		response: "",
		subPathStrict: [false],
		description: "displays this message ",
	},
	{
		name: ["uname"],
		action: true,
		response:
			"Darwin MacBook-Pro.local 20.1.0 Darwin Kernel Version 20.1.0: Sun Jul 18 10:32:00 PDT 2021; root:xnu-7195.50.7~2/RELEASE_ARM64_T8101 arm64",
		subPathStrict: [false],
		description:
			"prints the Darwin OS Kernel version / release / machine name. ",
	},
	{
		name: ["whoami"],
		action: true,
		response: "Aditya Sharma <br/> I'm a Full Stack Developer & DevOps Engineer",
		subPathStrict: [false],
		description:
			"prints the full name of the current administrator when invoked",
	},
];

commandList = commandList.map(item => {
	if (item.name[0] === "help") {
		item.response = `<pre>${compileCommandHTML(commandList)}</pre>`;
	}
	return item;
});

const fileList = [
	{
		name: ".github",
		link: "https://github.com/adityassharma-ss",
		folder: true,
		executable: false,
	},
	{
		name: "src",
		link: "https://github.com/boidushya/aditya",
		folder: true,
		executable: false,
	},
	{
		name: "resume.sh",
		link: "",
		folder: false,
		executable: true,
	},
	{
		name: "projects.app",
		link: "",
		folder: false,
		executable: true,
	},
];

const getCommandList = commandList => {
	let finalCommandList = {};
	commandList.forEach(item => {
		//eslint-disable-next-line
		let commandBuilder = {};
		item.name.forEach(elem => {
			let action = item.action
				? { [item.name[0].toUpperCase()]: "" }
				: null;
			let resp = item.response;
			commandBuilder = {
				[elem]: {
					validArgs: {
						_dir: {
							action: action,
							response: resp,
						},
						default: {
							action: action,
							response: resp,
						},
					},
				},
			};
			if (item.subPathStrict[0]) {
				commandBuilder[elem].validArgs[item.subPathStrict[1].name] = {
					action: action,
					response: item.subPathStrict[1].response,
				};
			}
			finalCommandList = { ...commandBuilder, ...finalCommandList };
		});
	});
	// console.log(finalCommandList)
	return finalCommandList;
};

const getArgListCd = fileList => {
	let defArgs = {
		_dir: {
			action: null,
			response: "",
		},
		default: {
			action: null,
			response: "cd: cannot access %arg%: Permission Denied",
		},
		"~": {
			action: null,
			response: "",
		},
	};
	let argList = {};
	fileList.forEach(item => {
		argList[item.name] = {
			action: item.folder ? { PATH: item.link } : null,
			response: item.folder ? "" : "zsh: cd: %arg%: Not a directory",
		};
	});
	Object.keys(defArgs).forEach(item => {
		argList[item] = defArgs[item];
	});
	return argList;
};

const commands = {
	ls: {
		validArgs: {
			"/": {
				action: null,
				response:
					"ls: cannot access System Volume Information: Permission Denied",
			},
			_dir: {
				action: null,
				response: compileResponseHTML(fileList),
			},
			default: {
				action: null,
				response: "ls: cannot access %arg%: Permission Denied",
			},
		},
	},
	cd: {
		validArgs: getArgListCd(fileList),
	},
	...getCommandList(commandList),
};

export default commands;
