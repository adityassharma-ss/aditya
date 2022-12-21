import React from "react";
import { ThemeProvider } from "styled-components";
import colors from "./styles/colors";
import Routes from "./pages/Routes";
import DataProvider from "../src/contexts/Data/DataProvider";

const App = () => {
	return (
		<ThemeProvider theme={colors}>
			<DataProvider>
				<Routes />
			</DataProvider>
		</ThemeProvider>
	);
};

export default App;
