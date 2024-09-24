const {
  runSimulation,
  initialiseBelt,
  initialiseWorkers,
  item_types,
  moveBelt,
  results,
} = require("../index");

describe("Conveyor Belt Simulation Tests", () => {
  beforeEach(() => {
    // Reset results before each test
    results.finishedProducts = 0;
    results.unusedA = 0;
    results.unusedB = 0;
  });

  test("initialiseBelt should return an array of the correct length", () => {
    const belt = initialiseBelt();
    expect(belt.length).toBe(3); // BELT_LENGTH is 3
    expect(belt).toEqual([item_types.none, item_types.none, item_types.none]);
  });

  test("initialiseWorkers should return an array of worker pairs", () => {
    const workers = initialiseWorkers();
    expect(workers.length).toBe(3); // NUM_WORKER_PAIRS is 3
    workers.forEach((workerPair) => {
      expect(workerPair.worker1.leftHand).toBe(item_types.none);
      expect(workerPair.worker2.rightHand).toBe(item_types.none);
      expect(workerPair.worker1.assemblyTimeLeft).toBe(0);
      expect(workerPair.worker2.assemblyTimeLeft).toBe(0);
    });
  });

  test("moveBelt should add a new random item and move the belt", () => {
    const belt = [item_types.none, item_types.a, item_types.b];
    const previousResults = { ...results };
    moveBelt(belt, results);
    expect(belt.length).toBe(3);
    expect(results.unusedA).toBe(previousResults.unusedA);
    expect(results.unusedB).toBe(previousResults.unusedB + 1);

    const belt2 = [item_types.none, item_types.b, item_types.a];
    const previousResults2 = { ...results };
    moveBelt(belt2, results);
    expect(belt.length).toBe(3);
    expect(results.unusedA).toBe(previousResults2.unusedA + 1);
    expect(results.unusedB).toBe(previousResults2.unusedB);
  });

  test("runSimulation should complete with valid results", () => {
    const simulationResults = runSimulation();
    expect(simulationResults.finishedProducts).toBeGreaterThanOrEqual(0);
    expect(simulationResults.unusedA).toBeGreaterThanOrEqual(0);
    expect(simulationResults.unusedB).toBeGreaterThanOrEqual(0);
  });
});
