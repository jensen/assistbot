import { useEffect, useState } from "react";

const useTicker = (ms = 2000) => {
  const [state, setState] = useState(false);

  /* I've left this dependency list empty on purpose,
     whenever the component renders, we want to recreate our timer
     likely the user is doing something more important
     so we should try and prioritize their updates
  */
  useEffect(() => {
    const timeout = setTimeout(() => setState(!state), ms);
    return () => clearTimeout(timeout);
  });
};

export const useSlowTicker = () => useTicker(5000);
export const useFastTicker = () => useTicker(1000);

export default useTicker;
