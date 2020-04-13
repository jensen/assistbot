import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { generateTimestamp } from "utils/date";

const DateDisplay = (props) => {
  const [date, setDate] = useState({ value: props.date });

  useEffect(() => {
    const timeout = setTimeout(() => setDate({ ...date }), 1000);
    return () => clearTimeout(timeout);
  }, [date]);

  return (
    <>
      {formatDistanceToNow(generateTimestamp(new Date(date.value)), {
        addSuffix: true,
      })}
    </>
  );
};
export default DateDisplay;
