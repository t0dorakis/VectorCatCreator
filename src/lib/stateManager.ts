type TState = Record<string, any>;
type TListener = (state: TState) => void;
type TStateManager = {
  state: TState;
  listeners: TListener[];
  getState: () => TState;
  setState: (newState: TState) => void;
  subscribe: (listener: TListener) => () => void;
};

class StateManager implements TStateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  state: TState;
  listeners: TListener[];

  getState() {
    return this.state;
  }

  setState(newState: TState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: TListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

const globalState = new StateManager();

export { globalState, type TState };
