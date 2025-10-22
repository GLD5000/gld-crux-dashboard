/* eslint-env jest */

import {
  getNewYearsDay,
  getPreviousNewYearsDay,
  getPreviousYearWeekOneStart,
  getWeekNumberFromISOString,
  getWeekOneStart,
  isBeforeFriday,
  timeDiffMs,
  timeDiffWeeks,
  getIsoStringFromRelativeWeekNumber,
  getFirstDayOfWeek,
  modifyWeekNumber,
  getLastSundayOfMonth,
  getCurrentCentury,
  dateIsBST,
} from "@/utils/dates";

describe("Week number", () => {
  it("Can get New Years Day", () => {
    expect(getNewYearsDay(new Date("2024-05-05T00:01:00Z")).getMonth()).toBe(0);
    expect(getNewYearsDay(new Date("2024-05-05T00:01:00Z")).toISOString()).toBe(
      "2024-01-01T00:00:00.000Z",
    );
  });

  it("Can get previous New Years Day", () => {
    expect(
      getPreviousNewYearsDay(new Date("2024-05-05T00:01:00Z")).toISOString(),
    ).toBe("2023-01-01T00:00:00.000Z");
  });

  it("Can tell it is before Friday", () => {
    expect(isBeforeFriday(new Date("2024-05-02T00:01:00Z"))).toBe(true);

    expect(isBeforeFriday(new Date("2024-05-03T00:01:00Z"))).toBe(false);

    expect(isBeforeFriday(new Date("2024-05-04T00:01:00Z"))).toBe(false);

    expect(isBeforeFriday(new Date("2024-05-05T00:01:00Z"))).toBe(true);
  });
  it("Get Start of Week one", () => {
    expect(
      getWeekOneStart(new Date("2027-01-01T00:01:00Z")).toISOString(),
    ).toBe("2027-01-03T00:00:00.000Z");
    expect(
      getWeekOneStart(new Date("2026-01-01T00:01:00Z")).toISOString(),
    ).toBe("2025-12-28T00:00:00.000Z");
    expect(
      getWeekOneStart(new Date("2025-01-01T00:01:00Z")).toISOString(),
    ).toBe("2024-12-29T00:00:00.000Z");
  });

  it("Get Start of Week one from previous Year", () => {
    expect(
      getPreviousYearWeekOneStart(
        new Date("2027-01-01T00:01:00Z"),
      ).toISOString(),
    ).toBe("2025-12-28T00:00:00.000Z");
    expect(
      getPreviousYearWeekOneStart(
        new Date("2026-01-01T00:01:00Z"),
      ).toISOString(),
    ).toBe("2024-12-29T00:00:00.000Z");
    expect(
      getPreviousYearWeekOneStart(
        new Date("2025-01-01T00:01:00Z"),
      ).toISOString(),
    ).toBe("2023-12-31T00:00:00.000Z");
  });

  it("Can get Milliseconds between dates", () => {
    expect(
      timeDiffMs(
        new Date("2024-05-05T00:01:00Z"),
        new Date("2024-05-05T00:01:00Z"),
      ),
    ).toBe(0);
    expect(
      timeDiffMs(
        new Date("2024-05-05T00:01:00Z"),
        new Date("2024-05-06T00:01:00Z"),
      ),
    ).toBe(86400000);
    expect(
      timeDiffMs(
        new Date("2024-05-05T00:01:00Z"),
        new Date("2024-05-12T00:01:00Z"),
      ),
    ).toBe(604800000);
  });
  it("Can get Weeks between dates", () => {
    expect(
      timeDiffWeeks(
        new Date("2024-05-05T00:01:00Z"),
        new Date("2024-05-05T00:01:00Z"),
      ),
    ).toBe(0);
    expect(
      timeDiffWeeks(
        new Date("2024-05-05T00:01:00Z"),
        new Date("2024-05-06T00:01:00Z"),
      ),
    ).toBe(0);
    expect(
      timeDiffWeeks(
        new Date("2024-05-05T00:01:00Z"),
        new Date("2024-05-12T00:01:00Z"),
      ),
    ).toBe(1);
    expect(
      timeDiffWeeks(
        new Date("2026-01-01T00:01:00Z"),
        new Date("2027-01-01T00:01:00Z"),
      ),
    ).toBe(52);
  });
  it("Accounts for leap Years", () => {
    expect(getWeekNumberFromISOString("2027-01-01T00:01:00Z")).toBe(53);
    expect(getWeekNumberFromISOString("2027-01-02T00:01:00Z")).toBe(53);
    expect(getWeekNumberFromISOString("2024-02-29T00:01:00Z")).toBe(9);
  });
});

describe("getFirstDayOfWeek", () => {
  it("First day is a Monday", () => {
    expect(getFirstDayOfWeek().getDay()).toBe(1);
  });
  it("Time is 1AM", () => {
    expect(getFirstDayOfWeek().getUTCHours()).toBe(1);
  });
  it("Time is 1AM", () => {
    expect(getFirstDayOfWeek().getMinutes()).toBe(1);
  });
  it("Week number is the same", () => {
    expect(getWeekNumberFromISOString(getFirstDayOfWeek().toISOString())).toBe(
      getWeekNumberFromISOString(new Date().toISOString()),
    );
  });
});

describe("getIsoStringFromRelativeWeekNumber", () => {
  const thisWeekNumber = getWeekNumberFromISOString(new Date().toISOString());
  it("Can get this week", () => {
    expect(
      getWeekNumberFromISOString(getIsoStringFromRelativeWeekNumber(0)),
    ).toBe(thisWeekNumber);
  });
  it("Can get first of the month", () => {
    expect(
      getWeekNumberFromISOString(
        getIsoStringFromRelativeWeekNumber(0, new Date(2025, 0, 1)),
      ),
    ).toBe(getWeekNumberFromISOString(new Date(2025, 0, 1).toISOString()));
  });
  it("Can get last week", () => {
    expect(
      getWeekNumberFromISOString(getIsoStringFromRelativeWeekNumber(-1)),
    ).toBe(thisWeekNumber - 1);
  });
  it("Can get two weeks ago", () => {
    expect(
      getWeekNumberFromISOString(getIsoStringFromRelativeWeekNumber(-2)),
    ).toBe(thisWeekNumber - 2);
  });
  it("Can get three weeks ago", () => {
    expect(
      getWeekNumberFromISOString(getIsoStringFromRelativeWeekNumber(-3)),
    ).toBe(thisWeekNumber - 3);
  });
  it("Can get three weeks ago from start of Year", () => {
    expect(
      getWeekNumberFromISOString(
        getIsoStringFromRelativeWeekNumber(-3, new Date(2025, 0, 1)),
      ),
    ).toBe(modifyWeekNumber(-3, new Date(2025, 0, 1)));
  });
  it("Can get three weeks ago from start of Year", () => {
    expect(
      getWeekNumberFromISOString(
        getIsoStringFromRelativeWeekNumber(-3, new Date(2023, 0, 1)),
      ),
    ).toBe(modifyWeekNumber(-3, new Date(2023, 0, 1)));
  });

  it("Can get three weeks ago from start of Year", () => {
    expect(
      getWeekNumberFromISOString(
        getIsoStringFromRelativeWeekNumber(-3, new Date(2024, 0, 1)),
      ),
    ).toBe(modifyWeekNumber(-3, new Date(2024, 0, 1)));
  });
});
//getLastSundayOfMonth

describe("getLastSundayOfMonth", () => {
  it("Can get a Sunday", () => {
    expect(getLastSundayOfMonth(2025, 2).getDay()).toBe(0);
  });
  it("Can get the start of BST", () => {
    expect(
      getLastSundayOfMonth(2025, 2).toISOString().indexOf("2025-03-30"),
    ).toBeGreaterThan(-1);
  });
  it("Can get the end of BST", () => {
    expect(
      getLastSundayOfMonth(2025, 9).toISOString().indexOf("2025-10-26"),
    ).toBeGreaterThan(-1);
  });
  it("Returns hour as 1 AM", () => {
    expect(getLastSundayOfMonth(2025, 9).getHours()).toBe(1);
  });
  it("Returns minute as o'clock", () => {
    expect(getLastSundayOfMonth(2025, 9).getMinutes()).toBe(0);
  });
});

describe("getCurrentCentury", () => {
  it("Can get the 2000s century", () => {
    expect(getCurrentCentury(new Date(2025, 3, 3, 3))).toBe(2000);
  });
  it("Can get the 2100s century", () => {
    expect(getCurrentCentury(new Date(2125, 3, 3, 3))).toBe(2100);
  });
});

describe("dateIsBST", () => {
  it("Can get first day of BST", () => {
    expect(dateIsBST(new Date(2025, 2, 30, 1, 1))).toBe(true);
  });
  it("Can get last day of BST", () => {
    expect(dateIsBST(new Date(2025, 9, 25))).toBe(true);
  });
  it("Can get before first day of BST", () => {
    expect(dateIsBST(new Date(2025, 2, 29, 1, 1))).toBe(false);
  });
  it("Can get after last day of BST", () => {
    expect(dateIsBST(new Date(2025, 9, 26, 1, 2))).toBe(false);
  });
});
