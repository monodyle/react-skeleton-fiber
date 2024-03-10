import Skeleton from "./skeleton";

export function Example () {
  return (
    <div className="example">
      <Skeleton width={48} height={48} className="avatar" />
      <Skeleton width={96} height={20} className="name" />
      <Skeleton width={72} height={20} className="title" />
    </div>
  )
}
