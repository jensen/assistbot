export const makeHash = (list) => {
  return list.reduce((hash, item) => ({ ...hash, [item.id]: item }), {});
};

export const makeList = (hash) => {
  return Object.keys(hash).map((key) => hash[key]);
};
