/**
 * @flow
 * @relayHash d7aaac0670550dd2ddd306583fe84478
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type messageMessage$ref = any;
export type chatSubscriptionVariables = {||};
export type chatSubscriptionResponse = {|
  +addMessage: ?{|
    +cursor: string,
    +node: ?{|
      +$fragmentRefs: messageMessage$ref
    |},
  |}
|};
export type chatSubscription = {|
  variables: chatSubscriptionVariables,
  response: chatSubscriptionResponse,
|};
*/


/*
subscription chatSubscription {
  addMessage {
    cursor
    node {
      ...messageMessage
      id
    }
  }
}

fragment messageMessage on Message {
  message
  emotes
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "chatSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "addMessage",
        "storageKey": null,
        "args": null,
        "concreteType": "MessageEdge",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "Message",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "messageMessage",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "chatSubscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "addMessage",
        "storageKey": null,
        "args": null,
        "concreteType": "MessageEdge",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "Message",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "message",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "emotes",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "id",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "subscription",
    "name": "chatSubscription",
    "id": null,
    "text": "subscription chatSubscription {\n  addMessage {\n    cursor\n    node {\n      ...messageMessage\n      id\n    }\n  }\n}\n\nfragment messageMessage on Message {\n  message\n  emotes\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4518496a628a6bf813c3dbf31ad88df9';

module.exports = node;
