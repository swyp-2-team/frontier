export interface LoginFormValues {
  id: string;
  password: string;
}

export interface LoginFormState {
  isLoginChecked: boolean;
  pwIconChecked: boolean;
  errors: {
    id: string;
    password: string;
  };
  isSubmitting: boolean;
}
