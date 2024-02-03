import { LoadingManager } from 'three'

export class Manager extends LoadingManager {
  constructor() {
    super(
      () => {
        console.log('Loading complete!')
      },
      (url, loaded, total) => {
        console.log(`Loading file ${url}. ${loaded} of ${total} loaded.`)
      },
      (url) => {
        console.log(`Error loading file ${url}.`)
      }
    )
  }
}

export const AppLoaderManager = new Manager()
