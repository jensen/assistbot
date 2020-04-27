/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type messageMessage$ref: FragmentReference;
declare export opaque type messageMessage$fragmentType: messageMessage$ref;
export type messageMessage = {|
  +message: ?string,
  +emotes: ?string,
  +$refType: messageMessage$ref,
|};
export type messageMessage$data = messageMessage;
export type messageMessage$key = {
  +$data?: messageMessage$data,
  +$fragmentRefs: messageMessage$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "messageMessage",
  "type": "Message",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "message",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "emotes",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '0f198ed376b8ccfa02f6d1d75f46de33';

module.exports = node;
