/* eslint-disable @next/next/no-img-element */
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

const PLACEHOLDER_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%20viewBox%3D%220%200%2027%2027%22%20shape-rendering%3D%22crispEdges%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M0%200h27v27H0z%22%2F%3E%3Cpath%20stroke%3D%22%23000000%22%20d%3D%22M1%201.5h7m4%200h3m2%200h1m1%200h7M1%202.5h1m5%200h1m3%200h1m2%200h4m1%200h1m5%200h1M1%203.5h1m1%200h3m1%200h1m1%200h2m1%200h1m2%200h1m3%200h1m1%200h3m1%200h1M1%204.5h1m1%200h3m1%200h1m1%200h1m4%200h3m2%200h1m1%200h3m1%200h1M1%205.5h1m1%200h3m1%200h1m1%200h3m2%200h1m2%200h1m1%200h1m1%200h3m1%200h1M1%206.5h1m5%200h1m1%200h1m2%200h1m2%200h2m2%200h1m5%200h1M1%207.5h7m1%200h1m1%200h1m1%200h1m1%200h1m1%200h1m1%200h7M9%208.5h1m5%200h1m1%200h1M1%209.5h1m1%200h5m5%200h1m5%200h5M2%2010.5h1m2%200h2m2%200h1m1%200h2m1%200h1m3%200h1m1%200h1m3%200h1M1%2011.5h5m1%200h1m1%200h2m3%200h4m2%200h1m1%200h1m1%200h2M1%2012.5h2m1%200h3m2%200h1m1%200h2m1%200h1m1%200h2m1%200h2m4%200h1M2%2013.5h3m2%200h1m4%200h2m1%200h2m1%200h2m1%200h1m1%200h3M1%2014.5h5m3%200h1m1%200h1m5%200h1m2%200h1m1%200h1m1%200h1M1%2015.5h1m5%200h2m2%200h3m2%200h1m2%200h4m1%200h2M1%2016.5h1m2%200h1m3%200h1m3%200h1m2%200h7m3%200h1M1%2017.5h1m1%200h1m2%200h2m1%200h4m4%200h5m1%200h1M9%2018.5h2m2%200h5m3%200h2M1%2019.5h7m6%200h2m1%200h1m1%200h1m1%200h1m1%200h3M1%2020.5h1m5%200h1m1%200h2m2%200h2m2%200h1m3%200h2m1%200h1M1%2021.5h1m1%200h3m1%200h1m1%200h3m1%200h1m1%200h7m1%200h1m1%200h1M1%2022.5h1m1%200h3m1%200h1m1%200h1m6%200h1m1%200h2m1%200h5M1%2023.5h1m1%200h3m1%200h1m1%200h5m2%200h1m5%200h2m1%200h1M1%2024.5h1m5%200h1m4%200h1m2%200h1m1%200h2m1%200h3m2%200h1M1%2025.5h7m1%200h2m1%200h1m5%200h8%22%2F%3E%3C%2Fsvg%3E%0A";

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

        <img
          src={preview ?? PLACEHOLDER_URL}
          alt="QR Code Preview"
          className="mt-1 aspect-square border-gray-500 w-full"
        />
      </SimpleGrid>
    </Paper>
  );
}
