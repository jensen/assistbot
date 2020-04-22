import { Environment, Network, RecordSource, Store } from "relay-runtime";

import socketInterface from "relay/interfaces/socket";
import fetchInterface from "relay/interfaces/fetch";

export default new Environment({
  network: Network.create(fetchInterface, socketInterface),
  store: new Store(new RecordSource()),
});
