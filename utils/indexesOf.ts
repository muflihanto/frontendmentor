export type IndexResult = {
  [x: string]: number[];
};

export default function indexesOf(string: string, reg: string | RegExp): IndexResult {
  let match,
    indexes: IndexResult = {};

  const regex = new RegExp(reg);

  while ((match = regex.exec(string))) {
    if (!indexes[match[0]]) {
      indexes[match[0]] = [];
    }
    indexes[match[0]].push(match.index);
  }

  return indexes;
}

export function getMaxIndex(string: string, reg: string | RegExp) {
  return Object.values(indexesOf(string, reg))
    .reduce((acc, curr) => {
      return [...curr, ...acc];
    }, [])
    .sort((a, b) => a - b)
    .pop();
}
