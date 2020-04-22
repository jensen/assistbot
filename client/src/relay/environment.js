import { Environment, Network, RecordSource, Store } from "relay-runtime";
import axios from "axios";

const fetchGraph = (params, variables) =>
  axios
    .post("/graphql", {
      query: params.text,
      variables,
    })
    .then(({ data }) => data);

export default new Environment({
  network: Network.create(fetchGraph),
  store: new Store(new RecordSource()),
});
