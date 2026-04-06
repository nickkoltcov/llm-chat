declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}


declare module "*.svg" {
  import { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}