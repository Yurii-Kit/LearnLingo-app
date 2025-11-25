interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const Icon = ({
  name,
  width = 32,
  height = 30,
  className = "",
  fill = "currentColor",
  ...props
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      fill={fill}
      {...props}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
