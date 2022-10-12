const tests = require("./userTest");

const deleter = tests[0];
const adder = tests[1];
const editor = tests[2];
const wiki = tests[3];

test("tries to delete a story", () => {
    expect(deleter(['abc', 'bac', 'cab'], 'cab')).toBe("Done");
})

test("tries to add a story", () => {
    expect(adder(['abc', 'bac'], 'cab')).toBe("Done");
})

test("tries to add a story", () => {
    expect(editor(['abc', 'bac','cab'], 'cab','cas')).toBe("Done");
})

test("tries to add a wiki", () => {
    expect(wiki('old wiki', 'old wiki')).toBe("Nothing has changed");
})

test("tries to add a wiki", () => {
    expect(wiki('old wiki', '')).toBe('old wiki');
})
