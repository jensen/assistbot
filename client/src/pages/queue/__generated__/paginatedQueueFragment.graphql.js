/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type messageMessage$ref = any;
type requestRequest$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type paginatedQueueFragment$ref: FragmentReference;
declare export opaque type paginatedQueueFragment$fragmentType: paginatedQueueFragment$ref;
export type paginatedQueueFragment = {|
  +id: string,
  +requests: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +createdAt: ?string,
        +acceptedAt: ?string,
        +completedAt: ?string,
        +user: ?{|
          +username: ?string,
          +avatar: ?string,
        |},
        +messages: ?$ReadOnlyArray<?{|
          +$fragmentRefs: messageMessage$ref
        |}>,
        +$fragmentRefs: requestRequest$ref,
      |}
    |}>
  |},
  +$refType: paginatedQueueFragment$ref,
|};
export type paginatedQueueFragment$data = paginatedQueueFragment;
export type paginatedQueueFragment$key = {
  +$data?: paginatedQueueFragment$data,
  +$fragmentRefs: paginatedQueueFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  "requests"
];
return {
  "kind": "Fragment",
  "name": "paginatedQueueFragment",
  "type": "Queue",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "operation": require('./QueuePaginationQuery.graphql.js'),
      "fragmentPathInResult": [
        "node"
      ]
    }
  },
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "after",
      "type": "String"
    },
    {
      "kind": "RootArgument",
      "name": "status",
      "type": "String"
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "requests",
      "name": "__queueQuery_requests_connection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "status",
          "variableName": "status"
        }
      ],
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
                    }
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
                      "kind": "FragmentSpread",
                      "name": "messageMessage",
                      "args": null
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "__typename",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "requestRequest",
                  "args": null
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
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'e4bdf1fee2670bab50cd17664f2697be';

module.exports = node;
