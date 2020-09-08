import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Context from './Context';
import useDispatch from './hooks/useDispatch';

// import { useForceUpdate, useIsomorphicLayoutEffect } from './utils';

// import { createDeepProxy, isDeepChanged } from './helpers/deepProxy';

// const deepState = (opts = {}) => {
//   const forceUpdate = useForceUpdate();
//   const { state, subscribe } = useContext(Context);
//   const affected = new WeakMap();
//   const lastRef = useRef(null);
//
//   useIsomorphicLayoutEffect(() => {
//     lastRef.current = {
//       state,
//       affected,
//       cache: new WeakMap(),
//       assumeChangedIfNotAffected: opts.unstable_forceUpdateForStateChange ? true : opts.unstable_ignoreIntermediateObjectUsage ? false : null,
//     };
//   });
//
//   useEffect(() => {
//     const callback = (nextState) => {
//       const changed = isDeepChanged(
//         lastRef.current.state,
//         nextState,
//         lastRef.current.affected,
//         lastRef.current.cache,
//         lastRef.current.assumeChangedIfNotAffected,
//       );
//       if (changed) {
//         lastRef.current.state = nextState;
//         forceUpdate();
//       }
//     };
//
//     forceUpdate();
//
//     return subscribe(callback);
//   }, [subscribe, forceUpdate]);
//
//   const proxyCache = useRef(new WeakMap());
//
//   return createDeepProxy(state, affected, proxyCache.current);
// };

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
  return props => {
    const { state, dispatch, actions, effects } = useContext(Context);

    let filteredState = {};
    let filteredDispatch = {};

    if (mapStateToProps) {
      filteredState = mapStateToProps(state || {});
    } else {
      filteredState = state
    }

    if (mapDispatchToProps) {
      filteredDispatch = mapDispatchToProps({
        ...actions,
        ...effects
      }, dispatch)
    }

    const [memoState, memoDispatch] = useMemo(() => {
      return [filteredState, filteredDispatch]
    }, [filteredState, filteredDispatch]);

    return (
      <Component
        {...props}
        {...memoState}
        {...memoDispatch}
        dispatch={dispatch}
      />
    )
  }
};

export default connect
