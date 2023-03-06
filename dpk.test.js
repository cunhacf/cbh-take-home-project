const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '30' if it's present as a partitionKey in the input", () => {
    const partitionKey = 30;
    const trivialKey = deterministicPartitionKey({ name: 'test', partitionKey });
    expect(trivialKey).toBe(partitionKey.toString());
  });

  it("Returns the hash representation of partitionKey if it's above 256 characters", () => {
    const partitionKey = 'CUOVmyEO50pXG4lilrnv4gGgCfZaXDedSnJ0HHxHJnxrROuIMczPFOAWyCtTcClpWNI25G9aS6rY9xYjjKbA81koURQT9p5D4IuQ5V11fLnvAxfhh64sCzxkR53iZMZk7T8CjGLCIEzvaFLowLt29p5uOTMzX6skShJPZZqQJiGxu6rS5ixmIsLYt9uAtiBQJHYpFUch7qkV0GsVLrwgYwerTJX8KdI0RCMlphsDoUYelqq8rp95AMyEJAVrdJ1HA';
    const trivialKey = deterministicPartitionKey({ partitionKey });
    expect(trivialKey).toBe('42a49b8ab21a3789a75ea5fe1ceecbae191601b68233e2ff3736a476b84100d05a554f06927ec905aeb8c41c1f949daf993de41aab101972984862bff21a80f2');
  });

  it("Returns the hash representation of the provided input", () => {
    const trivialKey = deterministicPartitionKey('input');
    expect(trivialKey).toBe('095de1650e4082237ba9e283f6e0fd025f759226ba51f70d6a083fdeb1245a6b79dcce864f857f7688f551ce9e52d82a24f7da77d693eca7bc4da6c4ca79d26a');
  });

  it("Accepts a number as input and returns its hash representation", () => {
    const trivialKey = deterministicPartitionKey(10);
    expect(trivialKey).toBe('0af1abec626b095704a5b03c13e47c3c18bcedb78566b6cadc4d5201cdb27691ce62fe60835587d41c8290616ad4ff1018b14dac6f83ff005922b25925fa4e6a');
  });

  it("Accepts an object as input and returns its hash representation", () => {
    const trivialKey = deterministicPartitionKey({ name: 'test' });
    expect(trivialKey).toBe('0b350c94cc3a107bb64db095fedbb11662f61e7e72913adb5a0aeafde21bd493bb215260f3887ef676b4b3cb0cd0f39093322315120e36abde6b9be7a8908034');
  });

  it("Accepts an array as input and returns its hash representation", () => {
    const trivialKey = deterministicPartitionKey([10, '10']);
    expect(trivialKey).toBe('fc2738a596354148fdf98d6c0fbda503c881e8c5ca1d0aac6259f0c73fb08d7a55402f8155be44ed01b76607abc3538b2e59c53484f90446247373bdfe2fa62c');
  });
});
