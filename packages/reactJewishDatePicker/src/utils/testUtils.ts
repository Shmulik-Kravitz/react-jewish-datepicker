export const isFromTest = () => {
    return process?.env?.JEST_WORKER_ID !== undefined;
};

export const getTestID = (testId: string) => {
    return isFromTest() ? testId :  undefined;
};
