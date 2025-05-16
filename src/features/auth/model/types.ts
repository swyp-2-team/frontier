export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormState {
  isLoginChecked: boolean;
  pwIconChecked: boolean;
  errors: {
    email: string;
    password: string;
  };
  isSubmitting: boolean;
}
