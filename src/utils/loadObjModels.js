import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import mapboxgl from 'mapbox-gl'

class modelLoadHelper {
  constructor(map, options) {
    this.map = map
    this.camera = new THREE.Camera()
    this.scene = new THREE.Scene()
    this.modelId = options.modelId ? options.modelId : '3dModel'
    this.modelOrigin = options.center ? options.center : [148.9819, -35.39847]
    this.modelHeight = options.height ? options.height : 0
    this.modelAngle = options.angle ? options.angle : 0
    this.modelScale = options.scale
      ? options.scale
      : {
          x: 1,
          y: 1,
          z: 1,
        }
    // 模型位置设置
    this.modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      this.modelOrigin,
      this.modelHeight
    )
    this.objUrl = options.objUrl
    this.mtlUrl = options.mtlUrl
    if (!this.objUrl) {
      console.warn('请输入obj模型的地址')
      return
    }

    const calPI = () => {
      const unit = Math.PI / 2 / 90
      return this.modelAngle * unit
    }

    const modelRotate = [Math.PI / 2, calPI(), 0]
    this.modelTransform = {
      translateX: this.modelAsMercatorCoordinate.x,
      translateY: this.modelAsMercatorCoordinate.y,
      translateZ: this.modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      /* Since the 3D model is in real world meters, a scale transform needs to be
       * applied since the CustomLayerInterface expects units in MercatorCoordinates.
       */
      scale: {
        x: this.modelScale.x * 10e-11,
        y: this.modelScale.y * 10e-11,
        z: this.modelScale.z * 10e-11,
      },
    }
  }

  addModel() {
    // configuration of the custom layer for a 3D model per the CustomLayerInterface
    const customLayer = {
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, gl) {
        // create two three.js lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.position.set(0, -70, 100).normalize()
        this.scene.add(directionalLight)

        const directionalLight2 = new THREE.DirectionalLight(0xffffff)
        directionalLight2.position.set(0, 70, 100).normalize()
        this.scene.add(directionalLight2)

        const light = new THREE.AmbientLight(0xd3f53a) // 创建一个灰色的环境光
        this.scene.add(light)

        // use the three.js GLTF loader to add the 3D model to the three.js scene
        // const loader = new THREE.GLTFLoader();
        // loader.load(
        //     'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
        //     (gltf) => {
        //         this.scene.add(gltf.scene);
        //     }
        // );

        const mtlLoader = new MTLLoader()
        const objLoader = new OBJLoader()
        mtlLoader.load(this.mtlUrl, (mtl) => {
          mtl.preload()
          for (const material of Object.values(mtl.materials)) {
            material.side = THREE.DoubleSide
          }
          objLoader.setMaterials(mtl)
          objLoader.load(this.objUrl, (root) => {
            this.scene.add(root)
          })
        })

        this.map = map

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        })

        this.renderer.autoClear = false
      }.bind(this),
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          this.modelTransform.rotateX
        )
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          this.modelTransform.rotateY
        )
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          this.modelTransform.rotateZ
        )

        const m = new THREE.Matrix4().fromArray(matrix)
        const l = new THREE.Matrix4()
          .makeTranslation(
            this.modelTransform.translateX,
            this.modelTransform.translateY,
            this.modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              this.modelTransform.scale.x,
              this.modelTransform.scale.y,
              this.modelTransform.scale.z
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ)

        this.camera.projectionMatrix = m.multiply(l)
        this.renderer.resetState()
        this.renderer.render(this.scene, this.camera)
        this.map.triggerRepaint()
      }.bind(this),
    }
    this.map.addLayer(customLayer, 'waterway-label')
    return customLayer
  }

  removeModel(layerId) {
    this.map.removeLayer(layerId)
  }
}

export default modelLoadHelper
