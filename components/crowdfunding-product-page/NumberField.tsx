import { useNumberFieldState } from "react-stately";
import {
  type AriaNumberFieldProps,
  useLocale,
  useNumberField,
} from "react-aria";
import { useRef } from "react";

export function NumberField(props: AriaNumberFieldProps) {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = useRef(null);
  const { labelProps, inputProps } = useNumberField(props, state, inputRef);

  return (
    <label
      {...labelProps}
      htmlFor="pledge"
      className="flex h-full w-[100px] items-center gap-2 place-self-start rounded-full ring-2 ring-inset ring-crowdfunding-neutral-100/20 focus-within:ring-crowdfunding-primary-100/50 lg:w-[102px]"
    >
      <span className="pl-6 text-[14px] font-bold text-crowdfunding-neutral-100/75">
        $
      </span>
      <input
        {...inputProps}
        id="pledge"
        name="pledge"
        type="number"
        ref={inputRef}
        className="h-[24px] w-[50%] rounded-full bg-none text-[14px] font-bold focus-within:outline-none"
      />
    </label>
  );
}
