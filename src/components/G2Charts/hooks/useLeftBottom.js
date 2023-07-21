export const useLeftBottom = () => {
  const data = [
    { type: '汉阳区', value: 27 },
    { type: '武昌区', value: 25 },
    { type: '硚口区', value: 18 },
    { type: '江夏区', value: 15 },
    { type: '洪山区', value: 10 },
    { type: '其他', value: 5 },
  ]
  const config = {
    appendPadding: 10,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    label: {
      offset: -15,
    },
    interactions: [{ type: 'element-active' }],
    height: 270,
  }
  return {
    data,
    config,
  }
}
