const { db } = require("../../db");

const { base64, unbase64 } = require("./encoding");

const PREFIX = "arrayconnector";

const offsetToCursor = (offset) => base64(PREFIX + offset);
const cursorToOffset = (cursor) =>
  parseInt(unbase64(cursor).substring(PREFIX.length), 10);

const connectionTo = (table, id, args) => {
  const { first, last, after, before } = args;

  let query = `SELECT * FROM ${table} WHERE ${table}.users_id = $1`;
  let params = [id];

  if (before && after) {
    const beforeId = cursorToOffset(before);
    const afterId = cursorToOffset(after);

    if (beforeId < afterId) {
      throw new Error(
        "Record for the before offset must be newer than the record for the after offset"
      );
    }

    query += ` AND ${table}.id < $2 AND ${table}.id > $3`;

    params[1] = beforeId;
    params[2] = afterId;
  } else {
    if (before) {
      query += ` AND ${table}.id < $2`;
      params[1] = cursorToOffset(before);
    }
    if (after) {
      query += ` AND ${table}.id > $2`;
      params[1] = cursorToOffset(after);
    }
  }

  query += ` ORDER BY ${table}.id`;

  if (first && last) {
    throw new Error("Should use either first or last, but not both");
  }

  if (first) {
    query += ` ASC LIMIT $${params.length + 1}`;
    params[params.length] = first + 1;
  }

  if (last) {
    query += ` DESC LIMIT $${params.length + 1}`;
    params[params.length] = last + 1;
  }

  if (!first && !last) {
    query += ` ASC`;
  }

  return db.query(query, params).then(({ rows: edges }) => {
    let allEdges = last ? edges.reverse() : edges;

    let hasPreviousPage = after ? true : false;
    let hasNextPage = before ? true : false;

    if (first && allEdges.length > first) {
      hasNextPage = true;
      allEdges = allEdges.slice(0, allEdges.length - 1);
    }

    if (last && allEdges.length > last) {
      hasPreviousPage = true;
      allEdges = allEdges.slice(1);
    }

    return {
      page_info: {
        start_cursor:
          (allEdges.length > 0 && offsetToCursor(allEdges[0].id)) || null,
        end_cursor:
          (allEdges.length > 0 &&
            offsetToCursor(allEdges[allEdges.length - 1].id)) ||
          null,
        has_previous_page: hasPreviousPage,
        has_next_page: hasNextPage,
      },
      edges: allEdges.map((edge) => ({
        cursor: offsetToCursor(edge.id),
        node: edge,
      })),
    };
  });
};

module.exports = {
  connectionTo,
};
