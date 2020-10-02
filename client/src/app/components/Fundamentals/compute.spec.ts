import { compute } from "./compute";

// describe() group of tests
// it() spec or test

// it receives as value the name of the system under test
// and a function that is gonna be called to execute the tests
describe('compute', () => {
    //First: name of the test. Second: The test itself
    it('should return 0 if input is negative', () => {
        const res = compute(-1);
        expect(res).toBe(0);
    }) 
}) 
