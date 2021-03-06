# react-context-hooks-store

A simple global store based on React Context and Hooks

##  Installation

```bash
npm install react-context-hooks-store
or
yarn add react-context-hooks-store
```

## Use It

```js
// reducers/common.js
let initialState = {
  theme: 'white'
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `common/${constants.ACTION_TYPE.UPDATE_STATE}`:
      return {
        ...state,
        ...payload
      };
      
    default:
      return state;
  }
};

export default reducer
```

```js
// store.js
import { Provider, connect, memoize, useStore, useDispatch, useDeepEffect, combineReducers } from 'react-context-hooks-store';

import common from './reducers/common';
import global from './reducers/global';

const rootReducer = combineReducers({
  global,
  common
});

export { Provider, connect, memoize, rootReducer, useStore, useDispatch, useDeepEffect, combineReducers }
```

```js
// src/index.js
import { Provider, rootReducer } from './store.js';

const initialValue = {}

<Provider rootReducer={rootReducer} initialValue={initialValue}>
  <App />
</Provider>
```

```js
// src/pages/movie.js
import { connect, memoize, useDeepEffect } from './store.js';

const Movie = ({ theme }) => {
  useDeepEffect(() => {
  }, [array, object]);
  
  return (
    <div>{theme}</div>
  )
}

const mapState = ({ common: { theme } }) => ({
  theme
});

// options
const memoPropsAreEqual = (prevProps, nextProps) => {
  if (nextProps.visible !== prevProps.visible) {
    return false
  }

  return true
};

export default connect(mapState)(memoize(Movie, memoPropsAreEqual))
```
