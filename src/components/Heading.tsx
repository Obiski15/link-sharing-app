interface Props {
  className?: string;
  children: string;
  type: string;
}

function Heading({ type, children, className }: Props) {
  switch (type) {
    case "small":
      return (
        <h1 className={`${className} font-semibold text-md leading-2`}>
          {children}
        </h1>
      );
    case "medium":
      return (
        <h1 className={`${className} text-lg leading-1 font-bold`}>
          {children}
        </h1>
      );
    default:
      return (
        <h1 className={`${className} text-md font-semibold leading-2`}>
          {children}
        </h1>
      );
  }
}

export default Heading;
