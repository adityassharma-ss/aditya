import React, { Suspense, lazy } from "react";
import Default from "../components/Default";
import Loader from "../elements/Loader/Loader";
const GitContent = lazy(() => import("../elements/Git/GitContent"));

const Resume = () => {
	return (
		<Default heading="git log" contextMenu={true} resizable={false}  programName="Git Log">
			<Suspense fallback={<Loader />}>
				<GitContent />
			</Suspense>
		</Default>
	);
};

export default Resume;
