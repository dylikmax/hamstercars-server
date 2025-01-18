export default function pickKeys(obj, keysToKeep) {
  return Object.keys(obj)
    .filter((key) => keysToKeep.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}