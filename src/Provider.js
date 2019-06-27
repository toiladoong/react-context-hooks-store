import React, { useCallback, useReducer, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './utils/index';
import Context from './Context';

const Provider = (props) => {
  const initialState = props.rootReducer(props.initialValue || {}, { type: '__INIT__' });

  const [state, dispatch] = useReducer(props.rootReducer, initialState);

  const subscribers = useRef([]);

  useIsomorphicLayoutEffect(() => {
    subscribers.current.forEach(fn => fn(state));
  }, [state]);

  const subscribe = useCallback((fn) => {
    if (typeof fn === 'function' && subscribers.current.indexOf(fn) === -1) {
      subscribers.current.push(fn);
    }

    return () => {
      const index = subscribers.current.indexOf(fn);

      if (index !== -1) {
        subscribers.current.splice(index, 1);
      }
    };
  }, []);

  const value = { state, dispatch, subscribe };

  return (
    <Context.Provider value={value} {...props} />
  );
};

export default Provider
