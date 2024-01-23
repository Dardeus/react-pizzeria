import React from "react"
import ContentLoader, {IContentLoaderProps} from "react-content-loader"

const Skeleton: React.FC<IContentLoaderProps> = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="277" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="428" rx="10" ry="10" width="83" height="35" />
    <rect x="138" y="424" rx="20" ry="20" width="143" height="45" />
  </ContentLoader>
)

export default Skeleton