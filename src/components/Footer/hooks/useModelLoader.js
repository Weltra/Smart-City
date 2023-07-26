import { inject } from 'vue'
import modelLoadHelper from '@/utils/loadObjModels'

export default () => {
  const { map } = inject('$scene_map')
  const modelLoadOpt = {
    center: [120.197688, 30.158199],
    angle: 0,
    scale: {
      x: 6,
      y: 6,
      z: 20,
    },
    objUrl: '/src/assets/models/model2/LeosVillage.obj',
    mtlUrl: '/src/assets/models/model2/LeosVillage.mtl',
  }

  const loader = new modelLoadHelper(map, modelLoadOpt)

  const removeModel = (layer) => {
    console.log(layer)
    layer && loader && loader.removeModel(layer.id)
  }

  const addModel = () => {
    loader && loader.addModel()
  }
  return {
    removeModel,
    addModel,
  }
}
