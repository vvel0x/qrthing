"use client";

import {
  ColorInput,
  Paper,
  SimpleGrid,
  Slider,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRef } from "react";

import { useQR } from "~/hooks/useQR";
import QRPreview from "./QRPreview";

export default function QRGenerator() {
  const { values, handleChange, preview } = useQR();
  const urlElementRef = useRef<HTMLInputElement>(null);

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData("text");

    if (urlElementRef.current) {
      urlElementRef.current.value = pastedData;
    }

    handleChange("url", pastedData);
  };

  return (
    <Paper withBorder p="xl" radius="md" miw={400} maw={500}>
      <Title size="lg">QR Code Generator</Title>
      <Text size="sm">Create simple QR codes...fast</Text>

      <TextInput
        ref={urlElementRef}
        mt="md"
        label="URL or Text"
        defaultValue={"https://example.com"}
        onChange={(e) => handleChange("url", e.currentTarget.value)}
        onPaste={onPaste}
      />

      <SimpleGrid
        mt="md"
        cols={{
          base: 1,
          sm: 2,
        }}
      >
        <Stack>
          <div>
            <Text size="sm" fw={500}>
              Size: {values.size}px
            </Text>
            <Slider
              label={(v) => `${v}px`}
              defaultValue={512}
              min={256}
              max={1024}
              step={128}
              marks={[{ value: 256 }, { value: 512 }, { value: 1024 }]}
              onChange={(value) => handleChange("size", value)}
            />
          </div>

          <ColorInput
            label="Background Color"
            defaultValue="#ffffff"
            onChange={(v) => handleChange("backgroundColor", v)}
          />

          <ColorInput
            label="Foreground Color"
            defaultValue="#000000"
            onChange={(v) => handleChange("foregroundColor", v)}
          />
        </Stack>

        <QRPreview data={values} />
      </SimpleGrid>
    </Paper>
  );
}
