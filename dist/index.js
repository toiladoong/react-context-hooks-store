(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.index = {}, global.React));
}(this, function (exports, React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

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

  function useDispatch() {
    var _useContext = React.useContext(Context),
        dispatch = _useContext.dispatch;

    return dispatch;
  }

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
  exports.useDispatch = useDispatch;
  exports.useStore = useStore;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
