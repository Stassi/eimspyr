import hello from './hello'

describe('hello(world)', () => {
  it('should return "hello world"', () => {
    expect(hello('world')).toBe('hello world')
  })
})
