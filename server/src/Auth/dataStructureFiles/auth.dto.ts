// Data Transfer Object.  What shape you can expect data to come in at.

export class SignUpDTO {
  readonly email: string;
  password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export class LogInDTO {
  readonly email: string;
  readonly password: string;
}
