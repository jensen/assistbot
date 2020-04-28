/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type requestRequest$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type allQueueFragment$ref: FragmentReference;
declare export opaque type allQueueFragment$fragmentType: allQueueFragment$ref;
export type allQueueFragment = {|
  +id: string,
  +requests: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +createdAt: ?string,
        +acceptedAt: ?string,
        +completedAt: ?string,
        +$fragmentRefs: requestRequest$ref,
      |}
    |}>
  |},
  +$refType: allQueueFragment$ref,
|};
export type allQueueFragment$data = allQueueFragment;
export type allQueueFragment$key = {
  +$data?: allQueueFragment$data,
  +$fragmentRefs: allQueueFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  "requests"
];
return {
  "kind": "Fragment",
  "name": "allQueueFragment",
  "type": "Queue",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "bidirectional",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": {
          "count": "last",
          "cursor": "before"
        },
        "path": (v0/*: any*/)
      },
      "operation": require('./allQueuePaginationQuery.graphql.js'),
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
      "name": "last",
      "type": "Int"
    },
    {
      "kind": "RootArgument",
      "name": "before",
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
      "name": "__allQueueQuery_requests_connection",
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
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '60213601b87f47ea99952bb9f9e9540d';

module.exports = node;
