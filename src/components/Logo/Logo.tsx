"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  width: number;
  height: number;
  className?: string;
};

export default function Logo({ width, height, className }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Image
      alt="logo"
      src={theme === "dark" ? "/ete.webp" : "/ete-dark.webp"}
      priority={true}
      height={height}
      width={width}
      className={className}
    />
  );
}
