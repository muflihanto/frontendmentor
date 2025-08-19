export type IndexResult = Record<string, number[]>;

export default function indexesOf(
  string: string,
  reg: string | RegExp,
): IndexResult {
  let match: ReturnType<RegExp["exec"]>;
  const indexes: IndexResult = {};

  const regex = new RegExp(reg);

  match = regex.exec(string);
  while (match) {
    if (!indexes[match[0]]) {
      indexes[match[0]] = [];
    }
    indexes[match[0]].push(match.index);
    match = regex.exec(string);
  }

  return indexes;
}

export function getMaxIndex(string: string, reg: string | RegExp) {
  const indexArrays = Object.values(indexesOf(string, reg));
  const allIndexes: number[] = [];

  for (const arr of indexArrays) {
    allIndexes.push(...arr);
  }

  if (allIndexes.length === 0) {
    return undefined;
  }

  return Math.max(...allIndexes);
}
