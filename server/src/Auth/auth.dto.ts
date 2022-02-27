export class SignUpDTO {
  readonly email: string;
  readonly password: string;
  readonly first_name: string;
  readonly last_name: string;
  date_created: string;
}

export class LogInDTO {
  readonly email: string;
  readonly password: string;
}
