import { useContext, useEffect, useRef } from 'react';

import Context from '../Context';

import { useForceUpdate, useIsomorphicLayoutEffect } from '../utils/index';

const isFunction = f => typeof f === 'function';
const defaultEqualityFn = (a, b) => a === b;

export const useSelector = (selector, eqlFn, options) => {
  const {
    equalityFn = isFunction(eqlFn) ? eqlFn : defaultEqualityFn,
    customContext = Context,
  } = options || (!isFunction(eqlFn) && eqlFn) || {};
  const forceUpdate = useForceUpdate();
  const { state, subscribe } = useContext(customContext);
  const selected = selector(state);
  const last = useRef(null);

  useIsomorphicLayoutEffect(() => {
    last.current = {
      equalityFn,
      selector,
      state,
      selected,
    };
  });

  useEffect(() => {
    const callback = (nextState) => {
      if (last.current.state === nextState) return;
      let changed;
      try {
        changed = !last.current.equalityFn(last.current.selected, last.current.selector(nextState));
      } catch (e) {
        changed = true; // stale props or some other reason
      }
      if (changed) {
        last.current.state = nextState;
        forceUpdate();
      }
    };
    // run once in case the state is already changed
    forceUpdate();

    return subscribe(callback);
  }, [subscribe, forceUpdate]);

  return selected;
};
