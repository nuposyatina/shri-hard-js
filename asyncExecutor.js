const asyncExecutor = (generator) => {
  const run = generator();

  const step = (stepValue) => {
    const { value, done } = run.next(stepValue);
    return done ? value : Promise.resolve(value).then(step);
  }

  return Promise.resolve().then(step);
};

// тесты
const ID = 42;
const delayMS = 1000;

function getId () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ID);
        }, delayMS);
    });
}

function getDataById (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            id === ID ? resolve('🍎') : reject('💥');
        }, delayMS);
    });
}

asyncExecutor(function* () {
    console.time("Time");

    const id = yield getId();
    const data = yield getDataById(id);
    console.log('Data', data);

    console.timeEnd("Time");
});
