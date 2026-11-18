import * as React from "react";

export default function CubeLabel({ children }: { children: React.ReactNode })
{
  return <span className="nav-cube">
    <span className="nav-cube-face nav-cube-front">{children}</span>
    <span className="nav-cube-face nav-cube-bottom" aria-hidden="true">{children}</span>
  </span>;
}
