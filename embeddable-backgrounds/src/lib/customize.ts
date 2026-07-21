import type { CSSProperties } from "react";

export type BackgroundSpeed = "slow" | "normal" | "fast";

export type BackgroundConfig = {
  speed: BackgroundSpeed;
  opacity: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
};

export const defaultBackgroundConfig: BackgroundConfig = {
  speed: "normal",
  opacity: 1,
  primaryColor: "#8b5cf6",
  secondaryColor: "#06b6d4",
  accentColor: "#ec4899",
};

function getSingleValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function isValidHexColor(value: string | undefined) {
  if (!value) return false;

  return /^#[0-9A-F]{6}$/i.test(value);
}

function normalizeOpacity(value: string | string[] | undefined) {
  const rawValue = getSingleValue(value);
  const numberValue = Number(rawValue);

  if (Number.isNaN(numberValue)) {
    return defaultBackgroundConfig.opacity;
  }

  if (numberValue < 0.1) {
    return 0.1;
  }

  if (numberValue > 1) {
    return 1;
  }

  return numberValue;
}

function normalizeSpeed(value: string | string[] | undefined): BackgroundSpeed {
  const rawValue = getSingleValue(value);

  if (rawValue === "slow" || rawValue === "normal" || rawValue === "fast") {
    return rawValue;
  }

  return defaultBackgroundConfig.speed;
}

export function getAnimationDuration(speed: BackgroundSpeed) {
  if (speed === "slow") return "18s";
  if (speed === "fast") return "5s";

  return "10s";
}

export function normalizeBackgroundConfig(
  input: Record<string, string | string[] | undefined>
): BackgroundConfig {
  const primaryColor = getSingleValue(input.primaryColor);
  const secondaryColor = getSingleValue(input.secondaryColor);
  const accentColor = getSingleValue(input.accentColor);

  return {
    speed: normalizeSpeed(input.speed),
    opacity: normalizeOpacity(input.opacity),
    primaryColor: isValidHexColor(primaryColor)
      ? primaryColor!
      : defaultBackgroundConfig.primaryColor,
    secondaryColor: isValidHexColor(secondaryColor)
      ? secondaryColor!
      : defaultBackgroundConfig.secondaryColor,
    accentColor: isValidHexColor(accentColor)
      ? accentColor!
      : defaultBackgroundConfig.accentColor,
  };
}

export function configToQueryString(config: BackgroundConfig) {
  const params = new URLSearchParams();

  params.set("speed", config.speed);
  params.set("opacity", String(config.opacity));
  params.set("primaryColor", config.primaryColor);
  params.set("secondaryColor", config.secondaryColor);
  params.set("accentColor", config.accentColor);

  return params.toString();
}

export function configToStyle(config: BackgroundConfig): CSSProperties {
  return {
    "--embed-primary": config.primaryColor,
    "--embed-secondary": config.secondaryColor,
    "--embed-accent": config.accentColor,
    "--embed-duration": getAnimationDuration(config.speed),
    opacity: config.opacity,
    animationDuration: getAnimationDuration(config.speed),
  } as CSSProperties;
}