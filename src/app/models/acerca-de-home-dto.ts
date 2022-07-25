export class AcercaDeHomeDTO {
  titulo!: string;
  descripcion!: string;
  descripcion2!: string;
  file!: File;
  link!: string;

  constructor(
    titulo: string,
    descripcion: string,
    descripcion2: string,
    file: File,
    link: string
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.descripcion2 = descripcion2;
    this.file = file;
    this.link = link;
  }
}
