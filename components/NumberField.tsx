import { useNumberFieldState } from "react-stately";
import {
  type AriaNumberFieldProps,
  useLocale,
  useNumberField,
} from "react-aria";
import { useRef } from "react";

export function NumberField(
  props: AriaNumberFieldProps & {
    labelClassName: string;
    inputClassName: string;
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
    <>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps} className="flex h-full gap-2 p-2">
        <input {...inputProps} ref={inputRef} className="rounded px-2" />
      </div>
    </>
  );
}
