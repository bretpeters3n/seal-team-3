// Data Transfer Object.  What shape you can expect data to come in at.

export class SignUpDTO {
  readonly email: string;
  password: string;
  readonly first_name: string;
  readonly last_name: string;
}

export class LogInDTO {
  readonly email: string;
  readonly password: string;
}
