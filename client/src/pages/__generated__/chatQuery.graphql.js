/**
 * @flow
 * @relayHash a63728c65913838cf3223c714ec3be9d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type groupGroup$ref = any;
export type chatQueryVariables = {||};
export type chatQueryResponse = {|
  +chat: ?{|
    +groups: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +id: string,
          +$fragmentRefs: groupGroup$ref,
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
query chatQuery {
  chat {
    groups(last: 250) {
      edges {
        node {
          id
          ...groupGroup
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

fragment groupGroup on MessageGroup {
  id
  messages {
    ...messageMessage
    id
  }
  user {
    id
    username
    avatar
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
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v3 = {
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
v4 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 250
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "chatQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
            "alias": "groups",
            "name": "__chatQuery_groups_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "MessageGroupConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "MessageGroupEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "MessageGroup",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "kind": "FragmentSpread",
                        "name": "groupGroup",
                        "args": null
                      }
                    ]
                  },
                  (v2/*: any*/)
                ]
              },
              (v3/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "chatQuery",
    "argumentDefinitions": [],
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
            "name": "groups",
            "storageKey": "groups(last:250)",
            "args": (v4/*: any*/),
            "concreteType": "MessageGroupConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "MessageGroupEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "MessageGroup",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "messages",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Message",
                        "plural": true,
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
                          (v0/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "user",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "User",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "username",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "avatar",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      (v1/*: any*/)
                    ]
                  },
                  (v2/*: any*/)
                ]
              },
              (v3/*: any*/)
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "groups",
            "args": (v4/*: any*/),
            "handle": "connection",
            "key": "chatQuery_groups",
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
    "text": "query chatQuery {\n  chat {\n    groups(last: 250) {\n      edges {\n        node {\n          id\n          ...groupGroup\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}\n\nfragment groupGroup on MessageGroup {\n  id\n  messages {\n    ...messageMessage\n    id\n  }\n  user {\n    id\n    username\n    avatar\n  }\n}\n\nfragment messageMessage on Message {\n  message\n  emotes\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "backward",
          "path": [
            "chat",
            "groups"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ae0baf08456ff75e90b3290967eaa0bc';

module.exports = node;
