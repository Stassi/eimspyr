export default function durationTimer(): () => number {
  const start: number = Date.now()
  return () => Date.now() - start
}
