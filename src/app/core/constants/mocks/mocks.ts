import { from, of } from "rxjs";
import {} from "jasmine";

export const storeMock = {
  dispatch: jasmine.createSpy("dispatch"),
  pipe: jasmine.createSpy("pipe").and.returnValue(
    from([
      {
        requestTimeout: 5000,
      },
    ])
  ),
  select: jasmine.createSpy().and.returnValue(of({})),
};
