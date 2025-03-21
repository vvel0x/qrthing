"use client";

import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface QRValues {
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
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleChange<FieldName extends keyof QRValues>(
    fieldName: FieldName,
    value: QRValues[FieldName]
  ) {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  useEffect(() => {
    QRCode.toString(values.url, {
      type: "svg",
      margin: 1,
      width: 100,
      color: {
        dark: values.foregroundColor,
        light: values.backgroundColor,
      },
    })
      .then((url) => {
        setPreview(
          `data:image/svg+xml;charset=utf-8,${encodeURIComponent(url)}`
        );
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      setPreview(null);
    };
  }, [values]);

  return {
    canvasRef,
    handleChange,
    preview,
    values,
  };
}
