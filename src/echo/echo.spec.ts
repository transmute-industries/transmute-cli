

import TransmuteCLI from '../index'

describe("Transmute Echo", () => {
  it("It should be a defined function", () => {
    expect(TransmuteCLI.echo).toBeDefined();
  });

  it("It should pass the message to the callback", () => {
    TransmuteCLI.echo('hello', (message)=>{
        expect(message).toBe('hello');
    })
  });
});
