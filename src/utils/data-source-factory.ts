import { DataSource, DataSourceOptions } from "typeorm";

export default function dataSourceFactory(options: DataSourceOptions): Promise<DataSource> {
  return Promise.resolve(new DataSource(options));
}
