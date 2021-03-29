import { isLocationValid } from "../src/client/js/app";

describe("testing if location input is valid", () => {
    test("testing isLocationValid", () => {
        expect(isLocationValid(null)).toBe(false);
    });
    test("testing isLocationValidkForUrl", () => {
        expect(isLocationValid('')).toBe(false);
    });
    test("testing isLocationValidkForUrl", () => {
        expect(isLocationValid('london')).toBe(true);
    });
});