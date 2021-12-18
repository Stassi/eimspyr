import type { InfoResponseFlat } from './flattenInfoResponses'
import { add, divide, length, map } from 'dechainer'

export type LatencyStatistics = Record<
  'maximum' | 'median' | 'minimum' | 'total',
  number
>

export default function latencyStatistics({
  messages,
}: InfoResponseFlat): LatencyStatistics {
  const latencies: number[] = map(
      ({ latency }: { latency: number }): number => latency,
      messages
    ),
    total: number = add(0, ...latencies)

  return {
    total,
    maximum: Math.max(...latencies),
    median: Math.round(divide(length(latencies), total)),
    minimum: Math.min(...latencies),
  }
}
