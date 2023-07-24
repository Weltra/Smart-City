import { computed, inject, ref } from 'vue'

export default () => {
  const { map } = inject('$scene_map')
  const moving = ref(true)

  const mark = computed(() => {
    return moving.value ? '停止' : '开启'
  })

  function rotation() {
    const zoom = map.getZoom()
    if (zoom < 5) {
      let center = map.getCenter()
      center.lng += 10
      map.easeTo({
        center,
        duration: 1000,
        easing: (n) => n,
      })
    }
  }
  rotation()
  map.on('moveend', () => {
    moving.value && rotation()
  })

  function handleRotation() {
    moving.value = !moving.value
    if (!moving.value) {
      map.stop()
    } else {
      rotation()
    }
  }

  return {
    mark,
    handleRotation,
  }
}
