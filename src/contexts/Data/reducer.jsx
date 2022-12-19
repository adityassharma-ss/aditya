export const reducer = (state, action) => {
	switch (action.type) {
		case "SET":
			let commands = state.commands;
			commands.push(action.payload);
			return {
				...state,
				commands: commands,
			};
		case "PATH":
			return {
				...state,
				path: action.payload,
			};
		case "ALERT":
			return {
				...state,
				alert: action.payload,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
