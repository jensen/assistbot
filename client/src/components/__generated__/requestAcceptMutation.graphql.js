/**
 * @flow
 * @relayHash 490758ed74bf2379d9a6504b8e5f0491
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type requestAcceptMutationVariables = {|
  id: string
|};
export type requestAcceptMutationResponse = {|
  +acceptRequest: ?{|
    +acceptedAt: ?string
  |}
|};
export type requestAcceptMutation = {|
  variables: requestAcceptMutationVariables,
  response: requestAcceptMutationResponse,
|};
*/


/*
mutation requestAcceptMutation(
  $id: ID!
) {
  acceptRequest(id: $id) {
    acceptedAt
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
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
  "name": "acceptedAt",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "requestAcceptMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "acceptRequest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Request",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "requestAcceptMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "acceptRequest",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Request",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "requestAcceptMutation",
    "id": null,
    "text": "mutation requestAcceptMutation(\n  $id: ID!\n) {\n  acceptRequest(id: $id) {\n    acceptedAt\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '13ce89846e3a7c9878bae8e4a5c44ee1';

module.exports = node;
