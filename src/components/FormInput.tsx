interface Props {
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  error: string | boolean | undefined;
  defaultValue?: string;
  placeholder: string;
  isActive: string;
  register: object;
  label: string;
  type: string;
  name: string;
  id: string;
  Icon: any;
}

function FormInput({
  id,
  type,
  name,
  placeholder,
  register,
  error,
  Icon,
  isActive,
  label,
  setIsActive,
  defaultValue,
}: Props) {
  return (
    <div className="self-start flex flex-col justify-between items-start gap-6 w-full">
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <label
          htmlFor={id}
          className="leading-3 text-sm font-normal capitalize"
        >
          {label}
        </label>

        <div
          className={`flex justify-between items-center gap-3 w-full border-[1px] rounded-lg py-3 px-4 min-h-[48px] ${
            isActive === name && !error
              ? "border-border-active shadow-[0px_0px_32px_0px_#633CFF40]"
              : error
              ? "border-error"
              : "border-border"
          }`}
        >
          <Icon strokeWidth={2.25} className="text-secondary-foreground" />
          <input
            id={id}
            className="focus:outline-none flex-1"
            name={name}
            type={type}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onFocus={() => setIsActive(name)}
            {...register}
          />
          {error && (
            <p className="font-normal text-right right-2 text-error text-sm leading-3">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormInput;
