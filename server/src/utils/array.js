const allRows = ({ rows }) => rows;
const firstRow = ({ rows }) => rows[0] || null;

module.exports = {
  allRows,
  firstRow,
};
