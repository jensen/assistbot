const { db } = require("../../db");
const { ApolloError } = require("apollo-server-express");
const { base64, unbase64 } = require("./encoding");

const PREFIX = "arrayconnector";

const offsetToCursor = (offset) => base64(PREFIX + offset);
const cursorToOffset = (cursor) =>
  parseInt(unbase64(cursor).substring(PREFIX.length), 10);

const connectionTo = (table, id, args) => {
  const { first, last, after, before } = args;

  /* start with an initial query of rows */
  let query = `SELECT * FROM ${table} WHERE ${table}.users_id = $1`;
  let params = [id];

  /* create a window on the data */
  if (before || after) {
    /* window start within the entire result set */
    if (before && after) {
      const beforeId = cursorToOffset(before);
      const afterId = cursorToOffset(after);

      /* no reason to have these out of logical order */
      if (beforeId < afterId) {
        throw new ApolloError(
          "Record for the before offset must be newer than the record for the after offset"
        );
      }

      /*
        create the window using ids, assuming that ids are created sequentially
  
        CONSTRAINT: the id for each each element must be sequential
      */
      query += ` AND ${table}.id < $2 AND ${table}.id > $3`;

      params[1] = beforeId;
      params[2] = afterId;
    } else {
      /*
        get the records before or after the cursor to beginning or end of
        result set
      */
      query += ` AND ${table}.id ${before ? " < $2" : " > $2"}`;
      params[1] = cursorToOffset(before || after);
    }
  }

  /* order to ensure deterministic results */
  query += ` ORDER BY ${table}.id`;

  if (first && last) {
    throw new ApolloError("Should use either first or last, but not both");
  }

  /* first and last allows us to resize the window */
  if (first || last) {
    /* if we want to get the first n results */
    if (first) {
      /* sort asscending to ensure we get the first results */
      query += ` ASC`;
      /*
        we add one to the limit so that we can determine if there
        is another page after this one
      */
      params[params.length] = first + 1;
    }

    /* if we want to get the last n results */
    if (last) {
      /* sort descending to ensure we get the last results */
      query += ` DESC`;
      /*
        we add one to the limit so that we can determine if there
        is another page before this one
      */
      params[params.length] = last + 1;
    }

    /* limit takes from the top, this is why asscending vs descending matters */
    query += ` LIMIT $${params.length}`;
  } else {
    /* we aren't limiting the results, default to ascending */
    query += ` ASC`;
  }

  /* ready to query the database */
  return db.query(query, params).then(({ rows: edges }) => {
    /*
      if we have an after cursor then we know that there is at least one
      record before this, since cursors are not inclusive

      ASSUMPTION: providing a cursor will not include the item in the results
    */
    let hasPreviousPage = after ? true : false;
    let hasNextPage = before ? true : false;

    /*
      we added one to the limit in the query, we get to use that to determine
      if there is actually a page after this

      slicing the results to reduce our list to the initial requested limit
    */
    if (first && edges.length > first) {
      hasNextPage = true;
      edges = edges.slice(0, first);
    }

    if (last && edges.length > last) {
      hasPreviousPage = true;
      edges = edges.slice(0, last);
    }

    /*
      in order to limit we need our results at the top
      now we reverse them back if we used last
    */
    const allEdges = last ? edges.reverse() : edges;

    /*
      produces the values to match the Relay pagination schema
      the keys are snake case, to match our table colum names
      this makes it easier when we translate pageInfo to page_info
      with the fieldResolver

      https://relay.dev/graphql/connections.htm
    */
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
