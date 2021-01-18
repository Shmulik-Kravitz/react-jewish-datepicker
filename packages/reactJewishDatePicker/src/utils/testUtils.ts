export const isFromTest = () => {
    return typeof process !== 'undefined' && process.env?.JEST_WORKER_ID !== undefined;
};

export const getTestID = (testId: string) => {
    return isFromTest() ? testId :  undefined;
};
