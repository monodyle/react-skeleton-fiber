import { useThree } from '@react-three/fiber'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import { Dot } from './dot'
import { OrthographicCamera } from 'three'

export type DotsProps = {
  radius?: number
  gap?: number
}

export function Dots ({ radius = 0.48, gap = 0.64 }: DotsProps) {
  const cameraRef = useRef<OrthographicCamera>(null)

  const size = useThree(state => state.size)

  const dots = useMemo(
    () => ({
      horizontal: Math.floor(size.width / (radius * 2 + gap)),
      vertical: Math.floor(size.height / (radius * 2 + gap))
    }),
    [gap, radius, size.height, size.width]
  )

  useEffect(() => {
    if (!cameraRef.current) return
    const aspectRatio = size.width / size.height
    cameraRef.current.left = -aspectRatio
    cameraRef.current.right = aspectRatio
    cameraRef.current.top = 1
    cameraRef.current.bottom = -1
    cameraRef.current.updateProjectionMatrix()
  }, [size])

  const positions = useMemo(() => {
    const positions = []
    const totalWidth = (dots.horizontal - 1) * (radius * 2 + gap)
    const totalHeight = (dots.vertical - 1) * (radius * 2 + gap)
    for (let i = 0; i < dots.horizontal; i++) {
      for (let j = 0; j < dots.vertical; j++) {
        positions.push([
          i * (radius * 2 + gap) - totalWidth / 2,
          j * (radius * 2 + gap) - totalHeight / 2,
          0
        ] as const)
      }
    }
    return positions
  }, [dots, radius, gap])

  return (
    <Fragment>
      <orthographicCamera
        ref={cameraRef}
        near={0.1}
        far={1000}
        position={[0, 0, 10]}
      />
      {positions.map((position, i) => (
        <Dot key={i} position={position} radius={radius} />
      ))}
    </Fragment>
  )
}
