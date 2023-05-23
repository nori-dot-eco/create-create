export const stringify: typeof JSON.stringify = (value, replacer, space) =>
  JSON.stringify(
    value,
    (key, v) => {
      const stringifiedValue = typeof v === 'bigint' ? v.toString() : v;
      return typeof replacer === 'function'
        ? replacer(key, stringifiedValue)
        : stringifiedValue;
    },
    space
  );
