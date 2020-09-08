import React, { useCallback, useReducer, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './utils';
import Context from './Context';
import applyMiddleware from './applyMiddleware';
import bindActionCreators from './bindActionCreators';

const Provider = (props) => {
  const { store } = props;

  const initialState = store ? store.getState(props.initialValue) : props.rootReducer(props.initialValue || {}, { type: '__INIT__' });

  // console.log('props.rootReducer', props.rootReducer);

  // console.log('initialState', initialState);

  const reducer = store ? store.getReducer : props.rootReducer;

  // console.log('reducer', reducer);

  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log('state useReducer', state);

  const subscribers = useRef([]);

  const stateRef = useRef(initialState);

  stateRef.current = state;

  const getState = () => {
    return stateRef.current;
  };

  // const interceptDispatch = applyMiddleware({ dispatch, getState }, props.rootMiddleware);

  const actions = bindActionCreators({
    dispatch,
    getState,
    cookies: props.cookies
  }, props.rootAction || {});

  const effects = store && store.getEffect(dispatch) || {};

  // console.log('effects Provider', effects);

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


  const value = {
    state: getState(),
    dispatch,
    actions,
    effects,
    subscribe
  };

  return (
    <Context.Provider value={value} {...props} />
  );
};

export default Provider
