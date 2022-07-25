export class NuevoUsuario {
  nombre!: string;
  apellido!: string;
  nombreUsuario!: string;
  email!: string;
  password!: string;
  roles!: string[];

  constructor(nombre: string, apellido: string, nombreUsuario: string, email: string, password: string, roles: string[]) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
