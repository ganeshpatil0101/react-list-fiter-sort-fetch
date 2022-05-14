export function sortName(ar, isDes, prop = "last_name") {
  const copy = [...ar];
  return copy.sort((a, b) => {
    const aProp = a[prop];
    const bProp = b[prop];
    if (aProp > bProp) {
      return isDes ? -1 : 1;
    } else {
      return isDes ? 1 : -1;
    }
  });
}
