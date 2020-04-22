import axios from "axios";

const fetchInterface = (params, variables) =>
  axios
    .post("/graphql", {
      query: params.text,
      variables,
    })
    .then(({ data }) => data);

export default fetchInterface;
