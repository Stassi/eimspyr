function hello(target: string): string {
  return `hello ${target}`
}

describe('hello world', () => {
  it('should have tests', () => {
    expect(hello('world')).toBe('hello world')
  })
})
