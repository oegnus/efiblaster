class _Input {
  constructor() {
  }

  getPlayerInput() {
    return {
      direction: {
        x: 0,
        y: 0
      }
    }
  }

}

export const Input = new _Input();