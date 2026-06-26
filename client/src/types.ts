export interface MetricsType {
  cpu: number;
  system_name: string;
  host_name: string;
  total_ram: number;
  used_ram: number;
  num_cpu: number;
  cpu_temp: number;
}

export interface ServerType {
  name: string;
  ip: string;
}
