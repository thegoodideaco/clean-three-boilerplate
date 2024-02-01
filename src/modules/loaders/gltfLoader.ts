// Configure and create Draco loader
import {
    DRACOLoader
} from 'three/addons/loaders/DRACOLoader.js'

import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js'

// Configure and create Draco loader
export const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
dracoLoader.preload()

export const glbLoader = new GLTFLoader()
glbLoader.setDRACOLoader(dracoLoader)



