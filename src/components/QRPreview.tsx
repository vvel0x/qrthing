/* eslint-disable @next/next/no-img-element */
'use client";';
import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

import { QRValues } from "~/hooks/useQR";
import PLACEHOLDER_QR from "~/images/qr-placeholder.svg";

interface QRPreviewProps {
  data: QRValues;
}

export default function QRPreview(props: QRPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { data } = props;

  useEffect(() => {
    async function generatePreview() {
      if (!data.url) return;

      const url = await QRCode.toString(data.url, {
        type: "svg",
        margin: 1,
        width: 100,
        color: {
          dark: data.foregroundColor,
          light: data.backgroundColor,
        },
      });

      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(url)}`;
    }

    generatePreview()
      .then((url) => {
        if (!url) return;
        setPreview(url);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      setPreview(null);
    };
  }, [data]);

  if (preview) {
    return (
      <img
        src={preview}
        alt="QR Code Preview"
        className="mt-1 aspect-square border-gray-500 w-full"
      />
    );
  }

  return (
    <Image
      src={PLACEHOLDER_QR}
      alt="QR Code Preview"
      className="mt-1 aspect-square border-gray-500 w-full"
      unoptimized
    />
  );
}
