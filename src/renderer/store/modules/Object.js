import AssimpJSONLoader from '@/gl/AssimpJSONLoader'

let scene = null

export default {

  state: {

    objects: {}

  },

  mutations: {

    SCENE_INIT (state, _scene) {
      scene = _scene
      Object.keys(state.objects).forEach(uuid => {
        scene.add(state.objects[uuid])
      })
    },

    SCENE_CLEAR (state) {
      if (scene) {
        Object.keys(state.objects).forEach(uuid => {
          scene.remove(state.objects[uuid])
        })
      }
    },

    OBJECT_ADD (state, object) {
      state.objects[object.uuid] = object
      if (scene) {
        scene.add(object)
      }
    },

    OBJECT_REMOVE (state, object) {
      delete state.objects[object.uuid]
      if (scene) {
        scene.remove(object)
      }
    }

  },

  actions: {

    init ({ commit }, scene) {
      console.debug('init scene', scene)
      commit('SCENE_INIT', scene)
    },

    load ({ commit }, data) {
      console.debug('load data', data)
      data = JSON.parse(data)
      const loader = new AssimpJSONLoader()
      const object = loader.parse(data)
      console.info('object', object)
      object.scale.multiplyScalar(0.01)
      commit('OBJECT_ADD', object)
    }

  }

}
