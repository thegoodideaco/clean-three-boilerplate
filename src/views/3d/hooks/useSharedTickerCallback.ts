import { Ticker, UPDATE_PRIORITY, type TickerCallback } from '@pixi/ticker'
import { onScopeDispose } from 'vue'

export let sharedTicker: Ticker | undefined

export function useSharedTicker() {
  if (!sharedTicker) {
    sharedTicker = new Ticker()
    sharedTicker.autoStart = false
    sharedTicker.stop()
  }

  return sharedTicker
}

/**
 * Hook for adding a callback to the main event loop
 *
 * Automatically removes the callback when the scope is disposed of
 */

export function useSharedTickerCallback(
  fn: TickerCallback<any>,
  context?: any,
  priority?: UPDATE_PRIORITY
) {
  if (!sharedTicker) {
    sharedTicker = new Ticker()
    sharedTicker.autoStart = false
    sharedTicker.stop()
  }

  const ticker = sharedTicker

  ticker.add(fn, context, priority)

  const dispose = () => {
    console.log('dispose the ticker callback')
    ticker.remove(fn, context)
  }
  onScopeDispose(dispose)

  return {
    ticker,
    dispose
  }
}
