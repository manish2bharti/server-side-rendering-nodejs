// Assume this function fetches large data from a database
async function getData(offset, limit, itemId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (itemId) {
        const item = {
          id: itemId,
          name: `Item ${itemId}`,
          description: `Item description`,
        };
        resolve(item);
      } else {
        const data = Array.from({ length: limit }, (_, index) => ({
          id: offset + index + 1,
          name: `Item ${offset + index + 1}`,
        }));
        resolve(data);
      }
    }, 100);
  });
}

module.exports = { getData };
