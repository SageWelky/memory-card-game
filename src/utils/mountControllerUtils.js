export const createMountController = () => {
  let resolveAllReady = null;
  let mounted = 0;
  let expected = null;
  let batchId = 0;

  return {
    allReady: () => {
      const currentBatch = ++batchId;
      if (expected !== null && mounted == expected) {
        return Promise.resolve();
      }
      return new Promise(resolve => {
        resolveAllReady = () => {
          if (currentBatch === batchId) {
            resolve();
            resolveAllReady = null;
            expected = null;
          }
        };
      });
    },
    refReady: (expectedCount) => {
      if (typeof expectedCount !== "number") {
        throw new Error(
          "refReady requires expectedCount on the first mount call"
        );
      }
      if (expected === null) {
        expected = expectedCount;
      }
      mounted++;
      if (mounted >= expected && resolveAllReady) {
        const resolver = resolveAllReady;
        requestAnimationFrame(() => {
          if (resolver) resolver();
        });
      }
    },
    refUnmount: () => {
      mounted = Math.max(0, mounted - 1);
      if (mounted === 0) {
        expected = null;
      }
    }
  };
};
