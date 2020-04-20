import { useState, useEffect } from "react";
import axios from "axios";
import { subDays } from "date-fns";
import { unixTimestamp } from "utils/date";

export default (endpoint, initialize, add) => {
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(unixTimestamp(new Date()));

  useEffect(() => {
    axios
      .get(`${endpoint}/${unixTimestamp(subDays(new Date(), 1))}`)
      .then(({ data }) => {
        initialize(data);
        setTimestamp(unixTimestamp(new Date()));
        setLoading(false);
      });
  }, [initialize, endpoint]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        axios.get(`${endpoint}/${timestamp}`).then(({ data }) => {
          if (data.length > 0) {
            add(data);
            setTimestamp(unixTimestamp(new Date()));
          }
        }),
      5000
    );

    return () => clearInterval(interval);
  }, [timestamp, add, endpoint]);

  return { loading };
};
