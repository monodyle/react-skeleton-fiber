import { useSpring, a } from '@react-spring/three'
import { MeshProps } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export type DotProps = {
  radius: number
  color?: {
    default: string,
    active: string
  }
}

export function Dot ({ radius, color: _color, ...props }: MeshProps & DotProps) {
  const dotColor = _color ?? {
    default: '#eaeaea',
    active: '#f0961f'
  }
  const [color, setColor] = useState(dotColor.default)
  const { colorSpring } = useSpring({
    colorSpring: color,
    config: { duration: 500 }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(Math.random() < 0.8 ? dotColor.default : dotColor.active)
    }, Math.random() * 1000 + 500)

    return () => clearInterval(interval)
  }, [dotColor.active, dotColor.default])

  return (
    <a.mesh {...props}>
      <circleGeometry args={[radius]} />
      <a.meshBasicMaterial attach='material' color={colorSpring} />
    </a.mesh>
  )
}
