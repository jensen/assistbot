/**
 * @flow
 * @relayHash aabddf13d1ac06d4c29e27ceb1f2397c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type paginatedQueueFragment$ref = any;
export type queueQueryVariables = {|
  first?: ?number,
  after?: ?string,
  status?: ?string,
|};
export type queueQueryResponse = {|
  +queue: ?{|
    +id: string,
    +$fragmentRefs: paginatedQueueFragment$ref,
  |}
|};
export type queueQuery = {|
  variables: queueQueryVariables,
  response: queueQueryResponse,
|};
*/


/*
query queueQuery(
  $first: Int
  $after: String
  $status: String
) {
  queue {
    id
    ...paginatedQueueFragment
  }
}

fragment messageMessage on Message {
  message
  emotes
}

fragment paginatedQueueFragment on Queue {
  id
  requests(first: $first, after: $after, status: $status) {
    edges {
      node {
        createdAt
        acceptedAt
        completedAt
        user {
          username
          avatar
          id
        }
        messages {
          ...messageMessage
          id
        }
        ...requestRequest
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment requestRequest on Request {
  id
  description
  type
  createdAt
  acceptedAt
  completedAt
  user {
    username
    avatar
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "status",
    "type": "String",
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
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "queueQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "queue",
        "storageKey": null,
        "args": null,
        "concreteType": "Queue",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "FragmentSpread",
            "name": "paginatedQueueFragment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "queueQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "queue",
        "storageKey": null,
        "args": null,
        "concreteType": "Queue",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "requests",
            "storageKey": null,
            "args": (v2/*: any*/),
            "concreteType": "RequestConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "RequestEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Request",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "createdAt",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "acceptedAt",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "completedAt",
                        "args": null,
                        "storageKey": null
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
                          },
                          (v1/*: any*/)
                        ]
                      },
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
                          (v1/*: any*/)
                        ]
                      },
                      (v1/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "description",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "type",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "cursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
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
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "requests",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "queueQuery_requests",
            "filters": [
              "status"
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "queueQuery",
    "id": null,
    "text": "query queueQuery(\n  $first: Int\n  $after: String\n  $status: String\n) {\n  queue {\n    id\n    ...paginatedQueueFragment\n  }\n}\n\nfragment messageMessage on Message {\n  message\n  emotes\n}\n\nfragment paginatedQueueFragment on Queue {\n  id\n  requests(first: $first, after: $after, status: $status) {\n    edges {\n      node {\n        createdAt\n        acceptedAt\n        completedAt\n        user {\n          username\n          avatar\n          id\n        }\n        messages {\n          ...messageMessage\n          id\n        }\n        ...requestRequest\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment requestRequest on Request {\n  id\n  description\n  type\n  createdAt\n  acceptedAt\n  completedAt\n  user {\n    username\n    avatar\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '67357fd415a446700da19b32a207093e';

module.exports = node;
