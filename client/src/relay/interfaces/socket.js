import { execute } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const ws = new SubscriptionClient("ws://localhost:3001/graphql", {
  reconnect: true,
});

const socketInterface = (operation, variables) =>
  execute(new WebSocketLink(ws), {
    query: operation.text,
    variables,
  });

export default socketInterface;
