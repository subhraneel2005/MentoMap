'use client'

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomEdge from './CustomEdge';

    const initNodes = [
        {
          id: '1',
          data: { label: 'Node 1' },
          position: { x: 0, y: 0 },
        },
        {
          id: '2',
          data: { label: 'Node 2' },
          position: { x: 100, y: 100 },
        },
        {
            id: '3',
            data: { label: 'Node 3' },
            position: { x: 100, y: 200 },
        }
      ];

      const initEdges = [{id:1-2, source:'1', target:'2', animated:true, type: 'custom-edge'}];
      const edgeTypes = {
        'custom-edge': CustomEdge,
      };
function Roadmap() {

      const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
      const [edges, setEdges, onEdgesChange] = useNodesState(initEdges);
      
      //connect the nodes with the edges
      const connect = useCallback((connection) => {
        const edge = {...connection, id: `${edges.length}+1`, animated:true, type: 'custom-edge'}
        setEdges((prevEdges) => addEdge(edge ,prevEdges))
      })

        const styles = {
            background: '#fff',
            width: '100%',
            height: 300,
          };

  return (
        <div  style={{ height: 500 }}>
            <ReactFlow
                nodes={nodes}
                style={styles}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={connect}
                fitview
            >
            <Background />
            <Controls />
            </ReactFlow>
        </div>
  )
}

export default Roadmap