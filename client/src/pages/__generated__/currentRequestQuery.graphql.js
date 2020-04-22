/**
 * @flow
 * @relayHash 69dcdbbcdbe437b7a01ac8f5b2b57bc0
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type currentRequestQueryVariables = {||};
export type currentRequestQueryResponse = {|
  +request: ?{|
    +id: string,
    +description: ?string,
    +createdAt: ?string,
    +acceptedAt: ?string,
    +completedAt: ?string,
    +user: ?{|
      +username: ?string,
      +avatar: ?string,
    |},
    +messages: ?$ReadOnlyArray<?{|
      +message: ?string,
      +emotes: ?string,
    |}>,
  |}
|};
export type currentRequestQuery = {|
  variables: currentRequestQueryVariables,
  response: currentRequestQueryResponse,
|};
*/


/*
query currentRequestQuery {
  request(filter: "accepted") {
    id
    description
    createdAt
    acceptedAt
    completedAt
    user {
      username
      avatar
      id
    }
    messages {
      message
      emotes
      id
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": "accepted"
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
  "name": "description",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "acceptedAt",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "completedAt",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "username",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatar",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "message",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "emotes",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "currentRequestQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "request",
        "storageKey": "request(filter:\"accepted\")",
        "args": (v0/*: any*/),
        "concreteType": "Request",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/)
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
              (v8/*: any*/),
              (v9/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "currentRequestQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "request",
        "storageKey": "request(filter:\"accepted\")",
        "args": (v0/*: any*/),
        "concreteType": "Request",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v7/*: any*/),
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
              (v8/*: any*/),
              (v9/*: any*/),
              (v1/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "currentRequestQuery",
    "id": null,
    "text": "query currentRequestQuery {\n  request(filter: \"accepted\") {\n    id\n    description\n    createdAt\n    acceptedAt\n    completedAt\n    user {\n      username\n      avatar\n      id\n    }\n    messages {\n      message\n      emotes\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'f7a464c468876f07f351ad37856f628f';

module.exports = node;
