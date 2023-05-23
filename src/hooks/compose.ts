import type { Hooks } from '../types';

export const compose = (hooks_: Hooks[]): Hooks<any> => {
  const hookStore: Record<string, ((...args: any[]) => Promise<void>)[]> = {};
  for (const hook of hooks_) {
    for (const [name, fn] of Object.entries(hook)) {
      if (hookStore[name] == undefined) hookStore[name] = [];
      hookStore[name]?.push(fn);
    }
  }

  const hooks: Hooks = {};
  for (const [name, fns] of Object.entries(hookStore)) {
    hooks[name as keyof Hooks] = async (...args: any[]) => {
      for (const fn of fns) {
        await fn(...args);
      }
    };
  }

  return hooks;
};
