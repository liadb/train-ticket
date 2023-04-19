import { Radio } from 'antd';
import React from "react";

interface FiltersConfigProps {
  name: string
  value: number
  filterFn(startNode, endNode): boolean
}

const filtersConfig: FiltersConfigProps[] = [
  {
    name: 'Start in a public service',
    value: 1,
    filterFn: (startNode) => {
      return startNode?.publicExposed
    },
  },
  {
    name: 'End in Sink',
    value: 2,
    filterFn: (startNode, endNode) => ['sql', 'rds'].includes(endNode?.kind),
  },
  {
    name: 'Have a vulnerability ',
    value: 3,
    filterFn: (startNode, endNode) => startNode?.vulnerabilities?.length || endNode?.vulnerabilities?.length,
  }
]

const FiltersBar = ({data, setFilteredData}: {data: any, setFilteredData(newData): void}) => {
  const onFilterSelect = (config: FiltersConfigProps) => {
    const newData = {
      nodes: data.nodes,
      edges: data.edges.filter(edge => {
        return config.filterFn(data.nodes.find(node => node.name === edge.source), data.nodes.find(node => node.name === edge.target))
      })
    }
    setFilteredData(newData)
  }

  return <div>
    <span>Filters: </span>
    <Radio.Group buttonStyle="solid">
      {filtersConfig.map(config => <Radio.Button key={config.value} value={config.value} onChange={() => onFilterSelect(config)}>{config.name}</Radio.Button>)}
    </Radio.Group>
  </div>
}

export default FiltersBar