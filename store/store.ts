import Vue from 'vue';
import Vuex from 'vuex';
import { CounterState } from './index';

Vue.use(Vuex);

export interface RootState {
  counter: CounterState;
}

export default new Vuex.Store<RootState>({});
