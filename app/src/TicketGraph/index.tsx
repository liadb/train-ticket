import G6 from '@antv/g6';
import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import {convertToGraphData, getColorByString} from "../TicketGraph/utils";
import * as jsonData from "../train-ticket-fe.json";
import FiltersBar from "./FiltersBar";

G6.registerNode(
  'sql',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -75,
          y: -25,
          width: 150,
          height: 50,
          radius: 10,
          stroke: cfg.vulnerabilities?.length ? 'red' : 'black',
          fill: getColorByString(cfg.language),
          lineWidth: cfg.vulnerabilities?.length ? 3 : 1,
        },
        name: 'rect-shape',
      });
      if (cfg.name) {
        group.addShape('text', {
          attrs: {
            text: cfg.name,
            x: 0,
            y: 0,
            fill: '#00287E',
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
            fontWeight: 'bold',
          },
          name: 'text-shape',
        });
      }
      return rect;
    },
  },
  'single-node',
);

let graph = null;

const TicketGraph = () => {
  const data = convertToGraphData(jsonData);
  const [filteredData, setFilteredData] = React.useState(data)
  const ref = React.useRef(null);

  useEffect(() => {
    if (!graph) {
      const container = ReactDOM.findDOMNode(ref.current);
      const width = container.scrollWidth - 216;
      const height = container.scrollHeight || 1000;
      graph = new G6.Graph({
        container,
        width,
        height,
        layout: {
          type: 'dagre',
          nodesep: 50,
          ranksep: 70,
          controlPoints: true,
        },
        defaultNode: {
          type: 'sql',
        },
        defaultEdge: {
          type: 'polyline',
          style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
          },
        },
        nodeStateStyles: {
          selected: {
            fill: '#5394ef',
          },
        },
          edgeStateStyles: {
            // edge style of active state
            active: {
              lineWidth: 2,
              stroke: '#5394ef'
            },
            // edge style of selected state
            selected: {
              stroke: '#5394ef',
              lineWidth: 3,
            },
          },
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            'click-select',
          ],
        },
        fitView: true,
      });
      graph.on('edge:mouseenter', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'active', true);
      });

      graph.on('edge:mouseleave', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'active', false);
      });

      graph.on('edge:click', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'selected', true);
      });
      graph.on('canvas:click', () => {
        graph.getEdges().forEach((edge) => {
          graph.clearItemStates(edge);
        });
      });
    }
    graph.data(filteredData);
    graph.render();

  }, [filteredData])

  return <div>
    <FiltersBar data={data} setFilteredData={setFilteredData}/>
    <div ref={ref}></div>
  </div>;
}

export default TicketGraph