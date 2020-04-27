/**
 * @flow
 * @relayHash e6dc041863cc1f3f67103581556198f4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type requestCompleteMutationVariables = {|
  id: string
|};
export type requestCompleteMutationResponse = {|
  +completeRequest: ?{|
    +completedAt: ?string
  |}
|};
export type requestCompleteMutation = {|
  variables: requestCompleteMutationVariables,
  response: requestCompleteMutationResponse,
|};
*/


/*
mutation requestCompleteMutation(
  $id: ID!
) {
  completeRequest(id: $id) {
    completedAt
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
  "name": "completedAt",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "requestCompleteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "completeRequest",
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
    "name": "requestCompleteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "completeRequest",
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
    "name": "requestCompleteMutation",
    "id": null,
    "text": "mutation requestCompleteMutation(\n  $id: ID!\n) {\n  completeRequest(id: $id) {\n    completedAt\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '24426a681a3e223a85b13af1381bea79';

module.exports = node;
