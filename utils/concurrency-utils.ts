export async function executePromisesAllWithConcurrency<T>(
  promises: Promise<T>[],
  concurrency: number,
) {
  const results = [];
  const chunks = [];

  // Divide the promises into chunks based on the concurrency level
  for (let i = 0; i < promises.length; i += concurrency) {
    chunks.push(promises.slice(i, i + concurrency));
  }

  // Execute each chunk of promises sequentially
  for (const chunk of chunks) {
    const chunkResults = await Promise.all(chunk);
    results.push(...chunkResults);
  }

  return results;
}

export async function executePromisesAllSettledWithConcurrency<T>(
  promises: Promise<T>[],
  concurrency: number,
) {
  const results = [];
  const chunks = [];

  // Divide the promises into chunks based on the concurrency level
  for (let i = 0; i < promises.length; i += concurrency) {
    chunks.push(promises.slice(i, i + concurrency));
  }

  // Execute each chunk of promises sequentially
  for (const chunk of chunks) {
    const chunkResults = await Promise.allSettled(chunk);
    results.push(...chunkResults);
  }

  return results;
}
