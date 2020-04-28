/**
 * @flow
 * @relayHash 712f2dfbcf2d9069d8d934fcf0ce3e5e
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type currentQueueFragment$ref = any;
export type queueCurrentQueryVariables = {|
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
  status?: ?string,
|};
export type queueCurrentQueryResponse = {|
  +queue: ?{|
    +id: string,
    +$fragmentRefs: currentQueueFragment$ref,
  |}
|};
export type queueCurrentQuery = {|
  variables: queueCurrentQueryVariables,
  response: queueCurrentQueryResponse,
|};
*/


/*
query queueCurrentQuery(
  $first: Int
  $after: String
  $last: Int
  $before: String
  $status: String
) {
  queue {
    id
    ...currentQueueFragment
  }
}

fragment currentQueueFragment on Queue {
  id
  requests(first: $first, after: $after, last: $last, before: $before, status: $status) {
    edges {
      node {
        ...requestRequest
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
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
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
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
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
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
    "name": "queueCurrentQuery",
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
            "name": "currentQueueFragment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "queueCurrentQuery",
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
                  },
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
              }
            ]
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "requests",
            "args": (v2/*: any*/),
            "handle": "connection",
            "key": "currentQueueQuery_requests",
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
    "name": "queueCurrentQuery",
    "id": null,
    "text": "query queueCurrentQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $status: String\n) {\n  queue {\n    id\n    ...currentQueueFragment\n  }\n}\n\nfragment currentQueueFragment on Queue {\n  id\n  requests(first: $first, after: $after, last: $last, before: $before, status: $status) {\n    edges {\n      node {\n        ...requestRequest\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment requestRequest on Request {\n  id\n  description\n  type\n  createdAt\n  acceptedAt\n  completedAt\n  user {\n    username\n    avatar\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '74b7446d91078757b6f5bbf0445f2d03';

module.exports = node;
