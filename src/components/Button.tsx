interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  iconOnly?: boolean;
  disabled?: boolean;
  variant: string;
  type?: string;
  children: any;
  Icon?: any;
}

const DEFAULT_STYLES: string =
  "text-center capitalize rounded-lg px-[27px] py-[11px] leading-2 text-md font-semibold";

function Button({ children, onClick, disabled, variant, type, Icon }: Props) {
  switch (variant) {
    case "primary":
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`${
            type === "full" ? "w-full" : ""
          } ${DEFAULT_STYLES} disabled:bg-primaryButton/50 bg-primaryButton hover:bg-primaryButton/90 active:bg-primaryButton/40 text-primaryButton-foreground active:shadow-[0px_0px_32px_0px_#633CFF40]`}
        >
          <p className=" flex justify-between items-center">
            {Icon && <Icon className="sm:hidden block" />}
            <span className={`w-full ${Icon ? "sm:inline hidden" : "inline"}`}>
              {children}
            </span>
          </p>
        </button>
      );
    case "secondary":
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`${
            type === "full" ? "w-full" : ""
          } ${DEFAULT_STYLES} bg-secondaryButton active:bg-secondaryButton-active text-secondaryButton-foreground border-[1px] border-border-active`}
        >
          <p className="flex justify-between items-center">
            {Icon && <Icon className="sm:hidden block" />}
            <span className={`w-full ${Icon ? "sm:inline hidden" : "inline"}`}>
              {children}
            </span>
          </p>
        </button>
      );
    default:
      return;
  }
}

export default Button;
