export class EmailChangeDTO {

  mailTo!: string;

  constructor(mailTo: string) {
    this.mailTo = mailTo;
  }
}
