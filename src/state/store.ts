import { combineReducers, createStore } from 'redux';

import * as reducers from './reducers';
import { IState } from './types';

// tslint:disable-next-line:no-console
console.log(reducers);
// tslint:disable-next-line:no-console
console.log({...reducers});

export const initialState:IState = {
    characters: [],
    charactersLoading: false,
    detailCharacter: -1
};
export const store = createStore(combineReducers({...reducers}));

export const dispatch = store.dispatch.bind(store);