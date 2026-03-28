export type DeviceKind = "mouse" | "keyboard" | "receiver";

export type DeviceStatus = "Connected" | "Disconnected";

export type ConnectionType = "Bluetooth" | "Logi Bolt" | "USB";

export interface DeviceItem {
  id: string;
  name: string;
  kind: DeviceKind;
  status: DeviceStatus;
  connection: ConnectionType;
  battery?: number;
  path: string;
}

export interface DeviceZone {
  id: string;
  name: string;
  description?: string;
}
