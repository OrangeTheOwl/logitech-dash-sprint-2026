import { DeviceItem, DeviceZone } from "@/types/ui";

export const devices: DeviceItem[] = [
  {
    id: "mx-master-3s",
    name: "MX Master 3S Mouse",
    kind: "mouse",
    status: "Connected",
    connection: "Bluetooth",
    battery: 78,
    path: "/device/mouse",
  },
  {
    id: "mx-mechanical",
    name: "MX Mechanical Keyboard",
    kind: "keyboard",
    status: "Connected",
    connection: "Logi Bolt",
    battery: 64,
    path: "/device/keyboard",
  },
  {
    id: "logi-bolt",
    name: "Logi Bolt Receiver",
    kind: "receiver",
    status: "Connected",
    connection: "USB",
    path: "/devices",
  },
];

export const profileOptions = ["Default", "Design", "Editing", "Focus"];

export const actionOptions = [
  "Volume up",
  "Volume down",
  "Mute",
  "Copy",
  "Paste",
  "Play/Pause",
  "DASH",
  "None",
];

export const mouseZones: DeviceZone[] = [
  { id: "left-click", name: "Left Click", description: "Primary click" },
  { id: "right-click", name: "Right Click", description: "Context click" },
  { id: "scroll-wheel", name: "Scroll Wheel", description: "Wheel press" },
  { id: "thumb-button", name: "Thumb Button", description: "Side command" },
  { id: "gesture-button", name: "Gesture Button", description: "Gesture trigger" },
  { id: "side-scroll", name: "Side Scroll", description: "Horizontal wheel" },
];

export const keyboardZones: DeviceZone[] = [
  { id: "f-row", name: "Function Row", description: "F1-F12 keys" },
  { id: "num-pad", name: "Numpad", description: "Numeric keypad" },
  { id: "media-keys", name: "Media Keys", description: "Volume and transport" },
  { id: "arrow-cluster", name: "Arrow Cluster", description: "Directional keys" },
  { id: "smart-illumination", name: "Smart Illumination", description: "Backlight control" },
];
