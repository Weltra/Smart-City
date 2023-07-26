import { computed, ref, inject } from 'vue'

export default () => {
  const { map } = inject('$scene_map')

  const isCenter = ref(false)

  const flyMsg = computed(() => {
    return isCenter.value ? '地球视角' : '城市视角'
  })

  function flyTo() {
    isCenter.value = !isCenter.value
    if (isCenter.value) {
      map.flyTo({
        center: [120.2, 30.25],
        zoom: 12,
        pitch: 80,
      })
    } else {
      map.flyTo({
        center: [120.2, 30.25],
        zoom: 2,
        pitch: 0,
      })
    }
  }
  return {
    flyMsg,
    flyTo,
  }
}
