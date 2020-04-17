import React from "react";
import { formatDistanceToNow } from "date-fns";
import { generateTimestamp } from "utils/date";

const DateDisplay = ({ date }) => (
  <>
    {formatDistanceToNow(generateTimestamp(new Date(date)), {
      addSuffix: true,
    })}
  </>
);

export default DateDisplay;
