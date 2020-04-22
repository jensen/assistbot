/**
 * @flow
 * @relayHash 40211fc496d0963f01db0341bc32c04a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type queueSubscriptionVariables = {||};
export type queueSubscriptionResponse = {|
  +requestAdded: ?{|
    +id: string,
    +description: ?string,
    +createdAt: ?string,
    +acceptedAt: ?string,
    +completedAt: ?string,
    +user: ?{|
      +username: ?string,
      +avatar: ?string,
    |},
  |}
|};
export type queueSubscription = {|
  variables: queueSubscriptionVariables,
  response: queueSubscriptionResponse,
|};
*/


/*
subscription queueSubscription {
  requestAdded {
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
  }
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
  "name": "description",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "acceptedAt",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "completedAt",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "username",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "avatar",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "queueSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "requestAdded",
        "storageKey": null,
        "args": null,
        "concreteType": "Request",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "queueSubscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "requestAdded",
        "storageKey": null,
        "args": null,
        "concreteType": "Request",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v0/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "subscription",
    "name": "queueSubscription",
    "id": null,
    "text": "subscription queueSubscription {\n  requestAdded {\n    id\n    description\n    createdAt\n    acceptedAt\n    completedAt\n    user {\n      username\n      avatar\n      id\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9e32b512641c9606b1176533ba82652e';

module.exports = node;
