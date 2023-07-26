export const useLeftBottom = () => {
  const data = [
    { type: '余杭区', value: 7 },
    { type: '西湖区', value: 6 },
    { type: '萧山区', value: 5 },
    { type: '上城区', value: 4 },
    { type: '建德市', value: 4 },
    { type: '临安区', value: 4 },
    { type: '富阳区', value: 4 },
    { type: '淳安县', value: 3 },
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
    height: 150,
  }
  return {
    data,
    config,
  }
}
