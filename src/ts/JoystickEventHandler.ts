export type Direction = 0 | 1 | -1;

export type JoystickEvent = {
  vDirection: Direction;
  hDirection: Direction;
};

export type JoystickEventListener = (evt: JoystickEvent) => void;
class JoystickEventHandler {
  private listeners: JoystickEventListener[];
  private fullDirection: JoystickEvent;

  constructor() {
    this.listeners = [];
    this.fullDirection = { vDirection: 0, hDirection: 0 };
    [...document.querySelectorAll<HTMLButtonElement>('#command-panel>div[data-cmd]')].forEach(btn => {
      const direction = btn.dataset.cmd;

      btn.addEventListener('touchstart', () => {
        switch (direction) {
          case 'ArrowUp': this.fullDirection.vDirection = 1; break;
          case 'ArrowDown': this.fullDirection.vDirection = -1; break;
          case 'ArrowLeft': this.fullDirection.hDirection = 1; break;
          case 'ArrowRight': this.fullDirection.hDirection = -1; break;
        }
      });
      btn.addEventListener('mousedown', () => {
        switch (direction) {
          case 'ArrowUp': this.fullDirection.vDirection = 1; break;
          case 'ArrowDown': this.fullDirection.vDirection = -1; break;
          case 'ArrowLeft': this.fullDirection.hDirection = 1; break;
          case 'ArrowRight': this.fullDirection.hDirection = -1; break;
        }
      });
      btn.addEventListener('touchend', () => {
        switch (direction) {
          case 'ArrowUp': this.fullDirection.vDirection = 0; break;
          case 'ArrowDown': this.fullDirection.vDirection = 0; break;
          case 'ArrowLeft': this.fullDirection.hDirection = 0; break;
          case 'ArrowRight': this.fullDirection.hDirection = 0; break;
        }
      });
      btn.addEventListener('mouseup', () => {
        switch (direction) {
          case 'ArrowUp': this.fullDirection.vDirection = 0; break;
          case 'ArrowDown': this.fullDirection.vDirection = 0; break;
          case 'ArrowLeft': this.fullDirection.hDirection = 0; break;
          case 'ArrowRight': this.fullDirection.hDirection = 0; break;
        }
      });
      btn.addEventListener('mouseout', () => {
        switch (direction) {
          case 'ArrowUp': this.fullDirection.vDirection = 0; break;
          case 'ArrowDown': this.fullDirection.vDirection = 0; break;
          case 'ArrowLeft': this.fullDirection.hDirection = 0; break;
          case 'ArrowRight': this.fullDirection.hDirection = 0; break;
        }
      });
    });

    setInterval(() => {
      this.listeners.forEach((singleListener) => {
        singleListener(this.fullDirection);
      });
    }, 100);
  }
  addEventListener(listener: JoystickEventListener): () => void {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    };
    return () => this.removeEventListener(listener);
  }
  removeEventListener(listener: JoystickEventListener) {
    this.listeners = this.listeners.filter(singleListener => singleListener !== listener);
  }
}

export const joystickEventHandler = new JoystickEventHandler();