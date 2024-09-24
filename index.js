const BELT_LENGTH = 3;
const NUM_WORKER_PAIRS = 3;
const SIMULATION_STEPS = 100;
const ASSEMBLY_TIME = 4;

let results = {
  finishedProducts: 0,
  unusedA: 0,
  unusedB: 0,
};

const item_types = {
  none: null,
  a: "A",
  b: "B",
  product: "P",
};

const getRandomItem = () => {
  const rand = Math.random();
  if (rand < 1 / 3) {
    return item_types.a;
  } else if (rand < 2 / 3) {
    return item_types.b;
  } else {
    return item_types.none;
  }
};

const initialiseBelt = () => {
  return Array(BELT_LENGTH).fill(item_types.none);
};

const initialiseWorkers = () => {
  return Array(NUM_WORKER_PAIRS)
    .fill()
    .map(() => ({
      worker1: {
        leftHand: item_types.none,
        rightHand: item_types.none,
        assemblyTimeLeft: 0,
      },
      worker2: {
        leftHand: item_types.none,
        rightHand: item_types.none,
        assemblyTimeLeft: 0,
      },
    }));
};

const moveBelt = (belt, results) => {
  const lastItem = belt.pop();
  belt.unshift(getRandomItem());
  if (lastItem === item_types.a) results.unusedA++;
  if (lastItem === item_types.b) results.unusedB++;
  if (lastItem === item_types.product) results.finishedProducts++;
};

const runSimulation = () => {
  let belt = initialiseBelt(); // initialise belt slots
  let workerPairs = initialiseWorkers(); // initialise pairs of workers

  for (let i = 0; i < SIMULATION_STEPS; i++) {
    // update arrays of belt slots with a new component
    moveBelt(belt, results);

    let activeWorker;

    workerPairs.map((workers) => {
      for (let worker in workers) {
        if (workers[worker].assemblyTimeLeft > 0) {
          workers[worker].assemblyTimeLeft--;
        }
      }
    });

    for (let j = 0; j < workerPairs.length; j++) {
      // each slot on the belt has a pair of workers assigned
      let slotComponent = belt[j];

      let { worker1, worker2 } = workerPairs[j];

      const worker1EmptyHands = !worker1.leftHand || !worker1.rightHand;

      const worker2EmptyHands = !worker2.leftHand || !worker2.rightHand;

      // Determine active worker based on availability
      if (worker1.assemblyTimeLeft > 0 && worker2.assemblyTimeLeft > 0) {
        continue;
      } else if (
        worker1EmptyHands &&
        worker2EmptyHands &&
        worker1.assemblyTimeLeft === 0 &&
        worker2.assemblyTimeLeft === 0
      ) {
        activeWorker = Math.random() > 0.5 ? worker1 : worker2; // Randomly select one
      } else if (worker1EmptyHands && worker1.assemblyTimeLeft === 0) {
        activeWorker = worker1; // Only worker1 is EmptyHands
      } else if (worker2EmptyHands && worker2.assemblyTimeLeft === 0) {
        activeWorker = worker2; // Only worker2 is available
      } else if (!worker1EmptyHands && worker1.assemblyTimeLeft === 0) {
        activeWorker = worker1;
      } else if (!worker2EmptyHands && worker2.assemblyTimeLeft === 0) {
        activeWorker = worker2;
      }

      if (!slotComponent) {
        if (activeWorker.leftHand === "P") {
          activeWorker.leftHand = item_types.none;
          belt[j] = "P";
        } else if (activeWorker.rightHand === "P") {
          activeWorker.rightHand = item_types.none;
          belt[j] = "P";
        }
        continue;
      }

      if (slotComponent === "A") {
        if (!activeWorker.leftHand) {
          activeWorker.leftHand = "A";
        }
        if (!activeWorker.rightHand) {
          activeWorker.rightHand = "A";
        }
        if (activeWorker.leftHand === "B") {
          belt[j] = item_types.none;
          activeWorker.leftHand = "P";
          activeWorker.assemblyTimeLeft = ASSEMBLY_TIME;
        }
        if (activeWorker.rightHand === "B") {
          belt[j] = item_types.none;
          activeWorker.rightHand = "P";
          activeWorker.assemblyTimeLeft = ASSEMBLY_TIME;
        }
        continue;
      }
      if (slotComponent === "B") {
        if (!activeWorker.leftHand) {
          activeWorker.leftHand = "B";
        }
        if (!activeWorker.rightHand) {
          activeWorker.rightHand = "B";
        }
        if (activeWorker.leftHand === "A") {
          belt[j] = item_types.none;
          activeWorker.leftHand = "P";
          activeWorker.assemblyTimeLeft = ASSEMBLY_TIME;
        }
        if (activeWorker.rightHand === "A") {
          belt[j] = item_types.none;
          activeWorker.rightHand = "P";
          activeWorker.assemblyTimeLeft = ASSEMBLY_TIME;
        }
        continue;
      }
    }
  }

  return results;
};

const simulationResults = runSimulation();

console.log("Simulation Results:", simulationResults);

module.exports = {
  runSimulation,
  initialiseBelt,
  initialiseWorkers,
  item_types,
  moveBelt,
  results,
};
