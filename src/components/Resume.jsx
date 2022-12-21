import React, { Suspense, lazy } from "react";
import Default from "../components/Default";
import Loader from "../elements/Loader/Loader";
const ResumeContent = lazy(() => import("../elements/Resume/ResumeContent"));

const Resume = () => {
	return (
		<Default height="90%" heading="Resume" resizable={false} programName="Resume">
			<Suspense fallback={<Loader />}>
				<ResumeContent />
			</Suspense>
		</Default>
	);
};

export default Resume;
