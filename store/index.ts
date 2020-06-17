import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store/store';

export interface CounterState {
  count: number;
}

@Module({ dynamic: true, store, name: 'counter', namespaced: true })
class Counter extends VuexModule {
  public count = 0;

  @Mutation
  increment(): void {
    this.count++;
  }

  @Mutation
  add(val: number): void {
    this.count += val;
  }

  @Action({ commit: 'add' })
  add5(): number {
    return 5;
  }
}

export const counterModule = getModule(Counter);
