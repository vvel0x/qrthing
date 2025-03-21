"use client";

import { useDebouncedState } from "@mantine/hooks";

export interface QRValues {
  url: string;
  size: number;
  backgroundColor: string;
  foregroundColor: string;
  format: "png" | "svg";
}

const DEFAULT_VALUES: QRValues = {
  url: "https://example.com",
  size: 512,
  backgroundColor: "#ffffff",
  foregroundColor: "#000000",
  format: "png",
};

export function useQR() {
  const [values, setValues] = useDebouncedState<QRValues>(DEFAULT_VALUES, 200);

  function handleChange<FieldName extends keyof QRValues>(
    fieldName: FieldName,
    value: QRValues[FieldName]
  ) {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  return {
    handleChange,
    values,
  };
}
