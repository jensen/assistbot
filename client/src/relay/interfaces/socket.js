import { execute } from "apollo-link";
import { parse } from "graphql";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const ws = new WebSocketLink(
  new SubscriptionClient("ws://localhost:3001/graphql", {
    reconnect: true,
  })
);

const socketInterface = (operation, variables) =>
  execute(ws, {
    query: parse(operation.text),
    variables,
  });

export default socketInterface;
