const allKeysAndSymbols = (obj) => {
  const iter = (current, props) => {
    if (!current) return props;

    const currentProps = Object.getOwnPropertyNames(current);
    const nextProps = currentProps.reduce((acc, el) => (
      acc.includes(el) ? acc : [...acc, el]
    ), props);
    const nextObj = Object.getPrototypeOf(current);

    return iter(nextObj, nextProps);
  };

  return iter(obj, []);
};

console.log(allKeysAndSymbols({}));
console.log(allKeysAndSymbols({first: 1, second: 2}));