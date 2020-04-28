/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type requestRequest$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type currentQueueFragment$ref: FragmentReference;
declare export opaque type currentQueueFragment$fragmentType: currentQueueFragment$ref;
export type currentQueueFragment = {|
  +id: string,
  +requests: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +node: ?{|
        +$fragmentRefs: requestRequest$ref
      |}
    |}>
  |},
  +$refType: currentQueueFragment$ref,
|};
export type currentQueueFragment$data = currentQueueFragment;
export type currentQueueFragment$key = {
  +$data?: currentQueueFragment$data,
  +$fragmentRefs: currentQueueFragment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  "requests"
];
return {
  "kind": "Fragment",
  "name": "currentQueueFragment",
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
      "operation": require('./currentQueuePaginationQuery.graphql.js'),
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
      "name": "__currentQueueQuery_requests_connection",
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
(node/*: any*/).hash = 'a4f93283c2bda73d1e686df35bad7b81';

module.exports = node;
