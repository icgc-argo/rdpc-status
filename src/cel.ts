type Run = {
  runName: string;
  state: string;
  completeTime: string;
};

export const cel = (runs: [Run]) => {
  const limit = process.env.CEL_LIMIT || 3;
  const rangeInDays = process.env.CEL_RANGE_DAYS || 7;

  const now = new Date();

  const celRuns = runs.map((run) => {
    const completeTime = new Date(parseInt(run["completeTime"]));
    const delta = now.getTime() - completeTime.getTime();
    const deltaDays = Math.floor(delta / 1000 / 60 / 60 / 24);

    return {
      ...run,
      completeTime: completeTime,
      cel: deltaDays < rangeInDays ? true : false,
    };
  });

  const celCount = celRuns.reduce((acc, curr) => {
    return curr.cel === true ? acc + 1 : acc;
  }, 0);

  return {
    cel: celCount >= limit,
    count: celCount,
    runs: celRuns,
  };
};
