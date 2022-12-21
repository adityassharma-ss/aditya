import React, { Suspense, lazy } from "react";
import Default from "../components/Default";
import Loader from "../elements/Loader/Loader";
const VSCodeContent = lazy(() => import("../elements/VSCode/VSCodeContent"));

const VSCode = () => {
	return (
		<Default height="90%" heading="Visual Studio Code" resizable={false} programName="Code">
			<Suspense fallback={<Loader />}>
				<VSCodeContent />
			</Suspense>
		</Default>
	);
};

export default VSCode;
