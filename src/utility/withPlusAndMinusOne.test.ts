import withPlusAndMinusOne from './withPlusAndMinusOne'

describe('with plus and minus one', () => {
  describe.each([
    {
      input: -1,
      expected: [-2, -1, 0],
    },
    {
      input: 0,
      expected: [-1, 0, 1],
    },
    {
      input: 1,
      expected: [0, 1, 2],
    },
  ])(
    'input: $input',
    ({ expected, input }: { expected: number[]; input: number }) => {
      it(`should return [${expected}]`, () => {
        expect(withPlusAndMinusOne(input)).toStrictEqual(expected)
      })
    }
  )
})
