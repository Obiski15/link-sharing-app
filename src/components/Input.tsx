interface Props {
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  error: string | boolean | undefined;
  defaultValue?: string;
  placeholder: string;
  disabled?: boolean;
  isActive: string;
  register: object;
  type: string;
  name: string;
  id: string;
}

function Input({
  id,
  type,
  name,
  placeholder,
  register,
  error,
  isActive,
  setIsActive,
  defaultValue,
  disabled,
}: Props) {
  return (
    <div
      className={`flex justify-between items-center gap-3 w-full border-[1px] rounded-lg basis-[70%] py-3 px-4 ${
        isActive === name && !error
          ? "border-border-active shadow-[0px_0px_32px_0px_#633CFF40]"
          : error
          ? "border-error"
          : "border-border"
      }`}
    >
      <input
        defaultValue={defaultValue}
        className="focus:outline-none flex-1"
        type={type}
        name={name}
        id={id}
        placeholder={`e.g. ${placeholder}`}
        onFocus={() => setIsActive(name)}
        {...register}
        disabled={disabled}
      />
      {error && (
        <p className="font-normal text-right right-2 text-error text-sm leading-3">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
