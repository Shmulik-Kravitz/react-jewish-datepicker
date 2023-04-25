export const isFromTest = () => {
	// console.log(process.env);
	return (
		typeof process !== "undefined" &&
		(process.env?.JEST_WORKER_ID !== undefined ||
			process.env?.VITEST_WORKER_ID !== undefined)
	);
};

export const getTestID = (testId: string) => {
	return isFromTest() ? testId : undefined;
};
