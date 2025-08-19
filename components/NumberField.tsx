import { useRef } from "react";
import {
  useLocale,
  useNumberField,
  type AriaNumberFieldProps,
} from "react-aria";
import { useNumberFieldState } from "react-stately";

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
      {/** biome-ignore lint/a11y/noLabelWithoutControl: Label is programmatically associated via useNumberField */}
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps} className="flex h-full gap-2 p-2">
        <input {...inputProps} ref={inputRef} className="rounded px-2" />
      </div>
    </>
  );
}
