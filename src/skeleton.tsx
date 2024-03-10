import { Canvas, CanvasProps } from '@react-three/fiber'

import { Dots, DotsProps } from './com/dots'

export type SkeletonProps = Omit<CanvasProps, 'children'> & DotsProps & {
  width?: number
  height?: number
}
function Skeleton ({ radius, gap, width, height, ...props }: SkeletonProps) {
  return (
    <Canvas {...props} style={{ width, height }}>
      <Dots radius={radius} gap={gap} />
    </Canvas>
  )
}

export default Skeleton
