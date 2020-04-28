/**
 * @flow
 * @relayHash f13f30ec21d3b78f9a1e2568491e6dae
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type messageMessage$ref = any;
export type chatQueryVariables = {|
  last?: ?number
|};
export type chatQueryResponse = {|
  +chat: ?{|
    +messages: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +user: ?{|
            +username: ?string,
            +avatar: ?string,
          |},
          +message: ?string,
          +emotes: ?string,
          +$fragmentRefs: messageMessage$ref,
        |}
      |}>
    |}
  |}
|};
export type chatQuery = {|
  variables: chatQueryVariables,
  response: chatQueryResponse,
|};
*/


/*
query chatQuery(
  $last: Int
) {
  chat {
    messages(last: $last) {
      edges {
        node {
          id
          user {
            username
            avatar
            id
          }
          message
          emotes
          ...messageMessage
          __typename
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        startCursor
      }
    }
  }
}

fragment messageMessage on Message {
  message
  emotes
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "username",
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
  "name": "message",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "emotes",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "pageInfo",
  "storageKey": null,
  "args": null,
  "concreteType": "PageInfo",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasPreviousPage",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "startCursor",
      "args": null,
      "storageKey": null
    }
  ]
},
v9 = [
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "chatQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "chat",
        "storageKey": null,
        "args": null,
        "concreteType": "Chat",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "messages",
            "name": "__chatQuery_messages_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "MessageConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "MessageEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Message",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "user",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "User",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ]
                      },
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "kind": "FragmentSpread",
                        "name": "messageMessage",
                        "args": null
                      }
                    ]
                  },
                  (v7/*: any*/)
                ]
              },
              (v8/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "chatQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "chat",
        "storageKey": null,
        "args": null,
        "concreteType": "Chat",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "messages",
            "storageKey": null,
            "args": (v9/*: any*/),
            "concreteType": "MessageConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "MessageEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Message",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "user",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "User",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v1/*: any*/)
                        ]
                      },
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ]
                  },
                  (v7/*: any*/)
                ]
              },
              (v8/*: any*/)
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "messages",
            "args": (v9/*: any*/),
            "handle": "connection",
            "key": "chatQuery_messages",
            "filters": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "chatQuery",
    "id": null,
    "text": "query chatQuery(\n  $last: Int\n) {\n  chat {\n    messages(last: $last) {\n      edges {\n        node {\n          id\n          user {\n            username\n            avatar\n            id\n          }\n          message\n          emotes\n          ...messageMessage\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}\n\nfragment messageMessage on Message {\n  message\n  emotes\n}\n",
    "metadata": {
      "connection": [
        {
          "count": "last",
          "cursor": null,
          "direction": "backward",
          "path": [
            "chat",
            "messages"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '81a982ee9e44fc1bf74ac1eec1564e4d';

module.exports = node;
