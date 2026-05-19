import { expect, test } from "vitest";
import { addHeader, MARKER } from "../src/utils.js";

test("add a header to body without an existing marker", () => {
  const currentBody = "Hello world, this is a description";
  const header = "> This is a fixed header";

  const newBody = addHeader(header, currentBody);

  expect(newBody).toEqual(`${header}${MARKER}\n\n${currentBody}`);
});

test("add a header to body with an existing marker", () => {
  const currentBody = `> This is the old header${MARKER}\n\nHello world, this is a description`;
  const header = "> This is a new fixed header";

  const newBody = addHeader(header, currentBody);

  expect(newBody).toEqual(`${header}${MARKER}\n\nHello world, this is a description`);
});

test("add a header to body with an existing marker which spans over multiple lines", () => {
  const currentBody = `> This is the old header\n> which continues over the next line ${MARKER}\n\nHello world, this is a description`;
  const header = "> This is a new fixed header\n> which also has a new line";

  const newBody = addHeader(header, currentBody);

  expect(newBody).toEqual(`${header}${MARKER}\n\nHello world, this is a description`);
});
