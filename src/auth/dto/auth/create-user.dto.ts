import { IsString, IsNotEmpty, Matches, MinLength, MaxLength, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, Validate } from 'class-validator';

@ValidatorConstraint({ name: 'equalsPassword', async: false })
export class EqualsPasswordValidator implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as any;
    return confirmPassword === object.password;
  }

  defaultMessage(args: ValidationArguments) {
    return 'As senhas não coincidem';
  }
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres' })
  @Matches(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula' })
  @Matches(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
  @Matches(/[\W_]/, { message: 'A senha deve conter pelo menos um caractere especial' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.password)
  @Validate(EqualsPasswordValidator)
  confirmPassword: string;
}
