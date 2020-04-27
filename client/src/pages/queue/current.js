import React, { Suspense } from "react";
import Request from "components/request";
import MessageGroup from "components/group";

const QueueCurrent = (props) => {
  return props.requests.edges.map(({ node: request }) => (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Request request={request} />
      </Suspense>
    </>
  ));
};

export default QueueCurrent;
