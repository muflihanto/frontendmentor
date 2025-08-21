import { useRef, type ReactNode } from "react";
import {
  useLocale,
  useNumberField,
  type AriaNumberFieldProps,
} from "react-aria";
import { useNumberFieldState } from "react-stately";
import { cn } from "../../utils/cn";

export function NumberField(
  props: AriaNumberFieldProps & {
    labelClassName?: string;
    inputClassName?: string;
    errorMessage?: ReactNode;
    errorState?: boolean;
    icon: ReactNode;
  },
) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);
  const { labelProps, groupProps, inputProps } = useNumberField(
    props,
    state,
    inputRef,
  );

  return (
    <label
      {...labelProps}
      className={cn([
        labelProps.className,
        "flex flex-col gap-[10px] lg:gap-[10px]",
      ])}
    >
      <div className="flex items-end justify-between">
        <span
          className={cn([
            "text-[15px] font-medium leading-[15px] tracking-[.5px]",
            props.labelClassName,
          ])}
        >
          {props.label}
        </span>
        {props.errorState && (
          <span className="text-[15px] font-medium leading-[15px] tracking-[.5px] text-red-700/70">
            {props.errorMessage}
          </span>
        )}
      </div>
      <div {...groupProps} className="relative">
        {props.icon}
        <input
          {...inputProps}
          ref={inputRef}
          placeholder="0"
          className={cn([
            inputProps.className,
            props.inputClassName,
            "w-full appearance-none rounded-md bg-tip-neutral-200 px-[17px] pb-[5px] pt-[7px] text-right text-[24px] text-tip-neutral-600 focus:ring-2 focus:ring-inset focus:ring-tip-primary focus-visible:outline-none",
            props.errorState && "focus:ring-red-700/75",
          ])}
        />
      </div>
    </label>
  );
}
