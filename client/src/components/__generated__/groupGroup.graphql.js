/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type messageMessage$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type groupGroup$ref: FragmentReference;
declare export opaque type groupGroup$fragmentType: groupGroup$ref;
export type groupGroup = {|
  +id: string,
  +messages: ?$ReadOnlyArray<?{|
    +$fragmentRefs: messageMessage$ref
  |}>,
  +user: ?{|
    +id: string,
    +username: ?string,
    +avatar: ?string,
  |},
  +$refType: groupGroup$ref,
|};
export type groupGroup$data = groupGroup;
export type groupGroup$key = {
  +$data?: groupGroup$data,
  +$fragmentRefs: groupGroup$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "groupGroup",
  "type": "MessageGroup",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
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
      "kind": "LinkedField",
      "alias": null,
      "name": "user",
      "storageKey": null,
      "args": null,
      "concreteType": "User",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b669925dfcae1e26b2af261e0ed14f05';

module.exports = node;
