const flatEdge = edge => edge.to.map(to => ({source: edge.from, target: to}))

export const convertToGraphData = (data) => {
  return {
    nodes: data.nodes.map(node => ({...node, id: node.name})),
    edges: data.edges.flatMap(edge => Array.isArray(edge.to) ? flatEdge(edge) : {source: edge.from, target: edge.to})
  }
}

const colors = [
  '#6565E9',
  '#FFA7E1',
  '#F48A29',
  '#ED4DB7',
  '#A7A7FA',
  '#FCB852',
  '#FF7E62',
  '#D25858',
  '#783030',
  '#73C41D',
  '#2BCC96'
]

export const getColorByString = (str: string): string => {
  const palletOrigin = colors
  const stringValue =
    str
      ?.split('')
      ?.map((str: string) => str.charCodeAt(0))
      ?.reduce((a, b) => a + b, 0) % palletOrigin.length

  return palletOrigin[stringValue]
}