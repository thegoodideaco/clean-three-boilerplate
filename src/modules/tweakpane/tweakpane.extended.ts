import { Pane } from 'tweakpane'
import type { PaneConfig } from 'tweakpane/dist/types/pane/pane-config'

import * as EssentialsPlugin from '@tweakpane/plugin-essentials'
import * as TweakpaneCamerakitPlugin from '@tweakpane/plugin-camerakit'
import { onScopeDispose } from 'vue'

let _container: HTMLDivElement | undefined
let _rootPane: PaneExtended | undefined

export class PaneExtended extends Pane {
  /**
   * @description
   * Get the root pane instance
   */
  static get rootPane(): PaneExtended {
    if (_rootPane) return _rootPane

    if (!_container) {
      _container = document.createElement('div')
      _container.id = 'tweakpane_container'
      document.body.appendChild(_container)
    }

    import('./styles.scss')

    const container = _container

    _rootPane = new PaneExtended({
      title: 'Dev Tools',
      expanded: true,
      container
    })

    return _rootPane
  }

  public constructor(options: PaneConfig) {
    super(options)

    this.registerPlugin(EssentialsPlugin)
    this.registerPlugin(TweakpaneCamerakitPlugin)
  }
}

export function usePane(pane = PaneExtended.rootPane): PaneExtended {
  onScopeDispose(() => {
    pane.dispose()

    if (pane === _rootPane) {
      _rootPane = undefined

      if (_container) {
        _container.remove()
        _container = undefined
      }
    }
  })

  return pane
}
