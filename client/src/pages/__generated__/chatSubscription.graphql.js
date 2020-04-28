/**
 * @flow
 * @relayHash 893d1414325c6991804b9c67bb0b58d0
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
      +user: ?{|
        +username: ?string,
        +displayName: ?string,
        +avatar: ?string,
      |},
      +$fragmentRefs: messageMessage$ref,
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
      user {
        username
        displayName
        avatar
        id
      }
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
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "username",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "displayName",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatar",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
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
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ]
              },
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
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ]
              },
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
              (v4/*: any*/)
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
    "text": "subscription chatSubscription {\n  addMessage {\n    cursor\n    node {\n      user {\n        username\n        displayName\n        avatar\n        id\n      }\n      ...messageMessage\n      id\n    }\n  }\n}\n\nfragment messageMessage on Message {\n  message\n  emotes\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4452d7b92a42e936e7d0fa72ee04c8fa';

module.exports = node;
