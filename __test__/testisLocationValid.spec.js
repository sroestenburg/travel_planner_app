import { isLocationValid } from "../src/client/js/app";

describe("testing if location input is valid", () => {
    //let search = new Search();
    test("testing isLocationValid", () => {
        expect(isLocationValid(null)).toBe(false);
    });
    test("testing isLocationValid", () => {
        expect(isLocationValid('')).toBe(false);
    });
    test("testing isLocationValid", () => {
        expect(isLocationValid('london')).toBe(true);
    });
});