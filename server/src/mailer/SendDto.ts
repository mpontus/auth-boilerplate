export interface SendDto {
  recipient: string;
  template: 'password_recovery';
  data: {
    action_url: string;
  };
}
