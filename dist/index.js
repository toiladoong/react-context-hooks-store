(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.index = {}, global.React));
}(this, function (exports, React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  //   get state() {
  //     throw new Error('Please use <Provider rootReducer={...} initialState={...}>');
  //   },
  //   get dispatch() {
  //     throw new Error('Please use <Provider rootReducer={...} initialState={...}>');
  //   },
  //   get subscribe() {
  //     throw new Error('Please use <Provider rootReducer={...} initialState={...}>');
  //   }
  // };
  //
  // const calculateChangedBits = (a, b) => (
  //   a.dispatch !== b.dispatch || a.subscribe !== b.subscribe ? 1 : 0
  // );
  //
  // const createCustomContext = (
  //   w = warningObject,
  //   c = calculateChangedBits,
  // ) => createContext(w, c);

  var Context = React.createContext();

  var Provider = function Provider(props) {
    var initialState = props.rootReducer(props.initialValue || {}, {
      type: '__INIT__'
    });

    var _useReducer = React.useReducer(props.rootReducer, initialState),
        _useReducer2 = _slicedToArray(_useReducer, 2),
        state = _useReducer2[0],
        dispatch = _useReducer2[1];

    var subscribers = React.useRef([]);
    useIsomorphicLayoutEffect(function () {
      subscribers.current.forEach(function (fn) {
        return fn(state);
      });
    }, [state]);
    var subscribe = React.useCallback(function (fn) {
      if (typeof fn === 'function' && subscribers.current.indexOf(fn) === -1) {
        subscribers.current.push(fn);
      }

      return function () {
        var index = subscribers.current.indexOf(fn);

        if (index !== -1) {
          subscribers.current.splice(index, 1);
        }
      };
    }, []);
    var value = {
      state: state,
      dispatch: dispatch,
      subscribe: subscribe
    };
    return React__default.createElement(Context.Provider, _extends({
      value: value
    }, props));
  };

  function useDispatch() {
    var _useContext = React.useContext(Context),
        dispatch = _useContext.dispatch;

    return dispatch;
  }

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

  var connect = function connect(mapStateToProps, mapDispatchToProps) {
    return function (Component) {
      return function (props) {
        var _useContext = React.useContext(Context),
            state = _useContext.state,
            dispatch = _useContext.dispatch;

        var filteredState = {};
        var filteredDispatch = {};

        if (mapStateToProps) {
          filteredState = mapStateToProps(state || {});
        } else {
          filteredState = state;
        }

        if (mapDispatchToProps) {
          filteredDispatch = mapDispatchToProps(dispatch);
        }

        var _useMemo = React.useMemo(function () {
          return [filteredState, filteredDispatch];
        }, [filteredState, filteredDispatch]),
            _useMemo2 = _slicedToArray(_useMemo, 2),
            memoState = _useMemo2[0],
            memoDispatch = _useMemo2[1];

        return React__default.createElement(Component, _extends({}, props, memoState, memoDispatch, {
          dispatch: dispatch
        }));
      };
    };
  };

  var isArray = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;
  var hasElementType = typeof Element !== 'undefined';

  function equal(a, b) {
    if (a === b) {
      return true;
    }

    if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
      var arrA = isArray(a);
      var arrB = isArray(b);
      var length;
      var key;

      if (arrA && arrB) {
        length = a.length;

        if (length !== b.length) {
          return false;
        }

        for (var i = 0; i < length; i++) {
          if (!equal(a[i], b[i])) {
            return false;
          }
        }

        return true;
      }

      if (arrA !== arrB) {
        return false;
      }

      var dateA = a instanceof Date;
      var dateB = b instanceof Date;

      if (dateA !== dateB) {
        return false;
      }

      if (dateA && dateB) {
        return a.getTime() === b.getTime();
      }

      var regexpA = a instanceof RegExp;
      var regexpB = b instanceof RegExp;

      if (regexpA !== regexpB) {
        return false;
      }

      if (regexpA && regexpB) {
        return a.toString() === b.toString();
      }

      var keys = keyList(a);
      length = keys.length;
      if (length !== keyList(b).length) return false;

      for (var _i = 0; _i < length; _i++) {
        if (!hasProp.call(b, keys[_i])) {
          return false;
        }
      }

      if (hasElementType && a instanceof Element) {
        return false;
      }

      for (var _i2 = 0; _i2 < length; _i2++) {
        key = keys[_i2];

        if (key === '_owner' && a.$$typeof) {
          continue;
        } else {
          if (!equal(a[key], b[key])) {
            return false;
          }
        }
      }

      return true;
    }

    return a !== a && b !== b;
  }

  function exportedEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
        console.warn('Warning: isEqual does not handle circular references.', error.name, error.message);
        return false;
      }

      throw error;
    }
  }

  var shallowDiffers = function shallowDiffers(prev, next) {
    for (var attribute in prev) {
      if (!(attribute in next)) {
        return true;
      }
    }

    for (var _attribute in next) {
      if (!exportedEqual(prev[_attribute], next[_attribute])) {
        return true;
      }
    }

    return false;
  };

  var areEqual = function areEqual(prevProps, nextProps) {
    var prevStyle = prevProps.style,
        prevRest = _objectWithoutProperties(prevProps, ["style"]);

    var nextStyle = nextProps.style,
        nextRest = _objectWithoutProperties(nextProps, ["style"]);

    return !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest);
  };

  var memoize = function memoize(Component) {
    var memoPropsAreEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : areEqual;
    return React.memo(Component, memoPropsAreEqual);
  };

  function unsubscribe(fn) {
  }

  function useStore(mapStateToProps, initialState) {
    var _useState = React.useState(initialState),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];
    React.useEffect(function () {
      return function () {
        return unsubscribe();
      };
    }, []);

    return state;
  }

  var equal$1 = function equal(a, b) {
    var ctor;
    var len;

    if (a === b) {
      return true;
    }

    if (a && b && (ctor = a.constructor) === b.constructor) {
      if (ctor === Date) {
        return a.getTime() === b.getTime();
      }

      if (ctor === RegExp) {
        return a.toString() === b.toString();
      }

      if (ctor === Array && (len = a.length) === b.length) {
        while (len-- && equal(a[len], b[len])) {
        }

        return len === -1;
      }

      if (ctor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
          return false;
        }

        for (len in a) {
          if (!(len in b) || !equal(a[len], b[len])) {
            return false;
          }
        }

        return true;
      }
    }

    return a !== a && b !== b;
  };

  function deepEqual(a, b) {
    try {
      return equal$1(a, b);
    } catch (error) {
      if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
        console.warn('Warning: deepEqual does not handle circular references.', error.name, error.message);
        return false;
      }

      throw error;
    }
  }

  var useDeepMemoize = function useDeepMemoize(value) {
    var ref = React.useRef([]);

    if (!deepEqual(value, ref.current)) {
      ref.current = value;
    }

    return ref.current;
  };

  var isPrimitive = function isPrimitive(val) {
    return val == null || /^[sbn]/.test(_typeof(val));
  };

  var checkDeps = function checkDeps(deps, name) {
    var hookName = "React.".concat(name.replace(/Deep/, ''));

    if (!deps || deps.length === 0) {
      console.warn("".concat(name, " should not be used with no dependencies. Use ").concat(hookName, " instead."));
    }

    if (deps.every(isPrimitive)) {
      console.warn("".concat(name, " should not be used with dependencies that are all primitive values. Use ").concat(hookName, " instead."));
    }
  };

  var useDeepEffect = function useDeepEffect(effect, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
      checkDeps(dependencies, 'useDeepEffect');
    }

    return React__default.useEffect(effect, useDeepMemoize(dependencies));
  };

  var useIsomorphicLayoutEffect$1 = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  var useDeepIsomorphicLayoutEffect = function useDeepIsomorphicLayoutEffect(effect, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
      checkDeps(dependencies, 'useDeepEffect');
    }

    return useIsomorphicLayoutEffect$1(effect, useDeepMemoize(dependencies));
  };

  var useDeepCallback = function useDeepCallback(callback, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
      checkDeps(dependencies, 'useDeepCallback');
    }

    return React__default.useCallback(callback, useDeepMemoize(dependencies));
  };

  var useDeepMemo = function useDeepMemo(factory, dependencies) {
    if (process.env.NODE_ENV !== 'production') {
      checkDeps(dependencies, 'useDeepMemo');
    }

    return React__default.useMemo(factory, useDeepMemoize(dependencies));
  };

  function combineReducers(reducers) {
    return function (state, action) {
      var newState = {};
      Object.keys(reducers).forEach(function (r) {
        var reducerState = state[r];
        reducerState = reducers[r](reducerState, action);
        newState[r] = reducerState;
      });
      return newState;
    };
  }

  exports.Provider = Provider;
  exports.combineReducers = combineReducers;
  exports.connect = connect;
  exports.memoize = memoize;
  exports.useDeepCallback = useDeepCallback;
  exports.useDeepEffect = useDeepEffect;
  exports.useDeepIsomorphicLayoutEffect = useDeepIsomorphicLayoutEffect;
  exports.useDeepMemo = useDeepMemo;
  exports.useDispatch = useDispatch;
  exports.useStore = useStore;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
