"use client";

import { Button } from "@mantine/core";
import QRCode from "qrcode";

import { QRValues } from "~/hooks/useQR";

interface DownloadButtonProps {
  data: QRValues;
}

export default function DownloadButton(props: DownloadButtonProps) {
  const { data } = props;

  const generatorOpts = {
    margin: 1,
    width: data.size,
    color: {
      dark: data.foregroundColor,
      light: data.backgroundColor,
    },
  };

  async function generateDownload() {
    if (!data.url) return null;
    let url: string | null = null;

    if (data.format === "svg") {
      const svg = await QRCode.toString(data.url, generatorOpts);
      url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    } else {
      url = await QRCode.toDataURL(data.url, generatorOpts);
    }

    return url;
  }

  async function download() {
    const filename = `qr-code.${data.format}`;
    const url = await generateDownload().catch((err) => {
      console.error(err);
    });

    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return (
    <Button mt="md" variant="outline" color="blue" onClick={download} fullWidth>
      Download as {data.format.toUpperCase()}
    </Button>
  );
}
