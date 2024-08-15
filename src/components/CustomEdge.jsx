import { RxCrossCircled } from "react-icons/rx";

import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
  } from '@xyflow/react';
  
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <RxCrossCircled
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              color: 'red'
            }}
            
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
            size={20}
          />
        </EdgeLabelRenderer>
      </>
    );
  }
  
  export default CustomEdge