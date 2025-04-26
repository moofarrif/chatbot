import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  // private  envConfig: { [key: string]: string };

  // constructor() {
  //   // Cargar todas las variables de entorno al iniciar el servicio
  //   this.envConfig = Object.keys(process.env).reduce((acc, key) => {
  //     if (process.env[key] !== undefined) {
  //       acc[key] = process.env[key] as string;
  //     }
  //     return acc;
  //   }, {} as { [key: string]: string });
  // }

  // // Método para obtener una variable de entorno específica
  // get(key: string): string {
  //   return this.envConfig[key];
  // }

  // // Método para obtener todas las variables de entorno
  // getAll(): { [key: string]: string } {
  //   return this.envConfig;
  // }
}
