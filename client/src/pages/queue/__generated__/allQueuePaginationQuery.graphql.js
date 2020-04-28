/**
 * @flow
 * @relayHash e2d66941e0075c51e1e83580039c53be
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type allQueueFragment$ref = any;
export type allQueuePaginationQueryVariables = {|
  first?: ?number,
  after?: ?string,
  last?: ?number,
  before?: ?string,
  status?: ?string,
  id: string,
|};
export type allQueuePaginationQueryResponse = {|
  +node: ?{|
    +$fragmentRefs: allQueueFragment$ref
  |}
|};
export type allQueuePaginationQuery = {|
  variables: allQueuePaginationQueryVariables,
  response: allQueuePaginationQueryResponse,
|};
*/


/*
query allQueuePaginationQuery(
  $first: Int
  $after: String
  $last: Int
  $before: String
  $status: String
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...allQueueFragment
    id
  }
}

fragment allQueueFragment on Queue {
  id
  requests(first: $first, after: $after, last: $last, before: $before, status: $status) {
    edges {
      node {
        createdAt
        acceptedAt
        completedAt
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
  },
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
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
    "name": "allQueuePaginationQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "allQueueFragment",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "allQueuePaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "Queue",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "requests",
                "storageKey": null,
                "args": (v4/*: any*/),
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
                          (v3/*: any*/),
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
                              (v3/*: any*/)
                            ]
                          },
                          (v2/*: any*/)
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
                "args": (v4/*: any*/),
                "handle": "connection",
                "key": "allQueueQuery_requests",
                "filters": [
                  "status"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "allQueuePaginationQuery",
    "id": null,
    "text": "query allQueuePaginationQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $status: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...allQueueFragment\n    id\n  }\n}\n\nfragment allQueueFragment on Queue {\n  id\n  requests(first: $first, after: $after, last: $last, before: $before, status: $status) {\n    edges {\n      node {\n        createdAt\n        acceptedAt\n        completedAt\n        ...requestRequest\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment requestRequest on Request {\n  id\n  description\n  type\n  createdAt\n  acceptedAt\n  completedAt\n  user {\n    username\n    avatar\n    id\n  }\n}\n",
    "metadata": {
      "derivedFrom": "allQueueFragment",
      "isRefetchableQuery": true
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '60213601b87f47ea99952bb9f9e9540d';

module.exports = node;
