const base64 = (input) => Buffer.from(input, "utf8").toString("base64");
const unbase64 = (input) => Buffer.from(input, "base64").toString("utf8");

const encodeGlobalId = (obj, type) => base64(`${obj.id}:${type}`);
const decodeGlobalId = (input) => {
  const [id, __typename] = unbase64(input).split(":");

  return {
    id,
    __typename,
  };
};

module.exports = {
  base64,
  unbase64,
  encodeGlobalId,
  decodeGlobalId,
};
