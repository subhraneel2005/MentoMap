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
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomEdge from './CustomEdge';
import { SketchPicker } from 'react-color';

// Custom Node with handles on all sides and specific handleId
const CustomNode = ({ data, selected }) => {
  return (
    <div
      style={{
        padding: 10,
        backgroundColor: data.color,
        border: selected ? '1px solid black' : '1px solid lightgray',
        borderRadius: 5
      }}
    >
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'lightgray' }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'lightgray' }} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} id="right" style={{ background: 'lightgray' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'lightgray' }} />
    </div>
  );
};

// Node Types
const nodeTypes = {
  customNode: CustomNode,
};

const initNodes = [];

const initEdges = [];
const edgeTypes = {
  'custom-edge': CustomEdge,
};

function Roadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useNodesState(initEdges);
  const [nodeLabel, setNodeLabel] = useState('');
  const [nodeColor, setNodeColor] = useState('#f0f0f0');
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const { deleteElements } = useReactFlow();

  // Add a new node
  const addNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'customNode',
      data: { label: nodeLabel, color: nodeColor },
      position: { x: Math.random() * 200, y: Math.random() * 200 },
    };

    if (!nodeLabel) {
      alert('Node name cannot be empty');
    } else {
      setNodes((prevNodes) => [...prevNodes, newNode]);
    }
  };

  // Connect the nodes with the edges
  const connect = useCallback((connection) => {
    const edge = {
      ...connection,
      id: `${edges.length + 1}`,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      animated: true,
      type: 'custom-edge',
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  });

  // Handle node name change
  const handleNodeLabelChange = (event) => {
    setNodeLabel(event.target.value);
  };

  // Handle node color change
  const handleNodeColorChange = (color) => {
    setNodeColor(color.hex);
  };

  // Recursive function to find all descendants of a node
  const findAllDescendants = (nodeId, edges, descendants = new Set()) => {
    edges.forEach(edge => {
      if (edge.source === nodeId && !descendants.has(edge.target)) {
        descendants.add(edge.target);
        findAllDescendants(edge.target, edges, descendants);
      }
    });
    return descendants;
  };

  // Handle node click and toggle visibility
  const onNodeClick = (event, node) => {
    const descendants = findAllDescendants(node.id, edges);

    // Toggle visibility of the clicked node's descendants
    setNodes(prevNodes =>
      prevNodes.map(n => {
        if (n.id !== node.id && descendants.has(n.id)) {
          return {
            ...n,
            hidden: !n.hidden,
          };
        }
        return n;
      })
    );

    setSelectedNode(node);
    setSelectedEdge(null);
  };

  // Handle node selection
  const onNodeSelect = (event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null); // Deselect edge when a node is selected
  };

  // Handle edge selection
  const onEdgeSelect = (event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null); // Deselect node when an edge is selected
  };

  // Delete the selected node
  const deleteNode = () => {
    if (selectedNode) {
      deleteElements({ nodes: [selectedNode] });
      setSelectedNode(null);
    } else {
      alert('No node selected for deletion');
    }
  };

  // Delete the selected edge
  const deleteEdge = () => {
    if (selectedEdge) {
      deleteElements({ edges: [selectedEdge] });
      setSelectedEdge(null);
    } else {
      alert('No edge selected for deletion');
    }
  };

  const styles = {
    background: 'rgb(243 244 246)',
    width: '100%',
    height: 500,
  };

  return (
    <div style={{ height: 600 }} className='flex justify-center items-center w-full'>
      <div className='h-full w-[40%] flex items-center justify-center flex-col bg-gray-100 space-y-6 border-r border-gray-600'>
        <span className='flex gap-3'>
          <h2 className='text-lg font-bold text-gray-800'>Node Editor</h2>
          <button className='bg-gray-800 py-2 px-4 text-[12px] hover:bg-black duration-500 text-white rounded-[18px]'>Save Roadmap</button>
        </span>
        <input
          type="text"
          className='bg-gray-200 px-3 py-2 rounded-[24px] border shadow-xl border-gray-800 outline-none text-black'
          placeholder="Enter node name"
          value={nodeLabel}
          onChange={handleNodeLabelChange}
        />
        <SketchPicker
          color={nodeColor}
          onChangeComplete={handleNodeColorChange}
        />
        <div className='flex w-full justify-between px-4'>
          <button onClick={addNode} className='bg-gray-900 py-2 px-4 text-[14px] hover:bg-black duration-500 text-white rounded-[18px]'>Add Node</button>
          <button onClick={deleteNode} className='bg-red-400 py-2 px-4 text-[14px] hover:bg-red-500 duration-500 text-white rounded-[18px]'>Delete Node</button>
          <button onClick={deleteEdge} className='bg-red-400 py-2 px-4 text-[14px] hover:bg-red-500 duration-500 text-white rounded-[18px]'>Delete Edge</button>
        </div>
      </div>

      <ReactFlow
        nodes={nodes}
        style={styles}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={connect}
        onNodeClick={onNodeClick}  // Capture node click for toggling visibility
        onEdgeClick={onEdgeSelect}  // Capture edge selection
        fitview='true'
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function WrappedRoadmap() {
  return (
    <ReactFlowProvider>
      <Roadmap />
    </ReactFlowProvider>
  );
}
