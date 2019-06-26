import { useEffect, useLayoutEffect, useReducer } from 'react';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const forcedReducer = state => state + 1;

export const useForceUpdate = () => useReducer(forcedReducer, 0)[1];
