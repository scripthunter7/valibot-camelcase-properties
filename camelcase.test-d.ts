import { describe, expect, expectTypeOf, it } from 'vitest';

import * as v from 'valibot';
import camelcaseKeys from 'camelcase-keys';

describe('camelcaseKeys', () => {
  const baseSchema = v.object({
    foo_bar: v.string(),
  });

  const camelCaseSchema = v.pipe(baseSchema, v.transform(camelcaseKeys));

  const testInput = {
    foo_bar: 'baz',
  };

  it('Base result', () => {
    const baseResult = v.parse(baseSchema, testInput);

    expectTypeOf(baseResult).toEqualTypeOf<{ foo_bar: string }>();
    expect(baseResult).toEqual(testInput);
  });

  it('Camel-cased result', () => {
    const camelCasedResult = v.parse(camelCaseSchema, testInput);

    expectTypeOf(camelCasedResult).toEqualTypeOf<{ fooBar: string }>();
    expect(camelCasedResult).toEqual(camelcaseKeys(testInput));
  });
});
