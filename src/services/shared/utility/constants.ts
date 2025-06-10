export const SCHEMA_NAME = {
    IDENTITY:'Identity'
}

export const USER_ROLES = {
  IDENTITY:'Identity',
  ADMIN:'Admin'
}


export const RESPONSE_MESSAGE = {
  EMAIL_MOBILE_ALREADY_REGISTERED:"User with this email and mobile number already exists",
  EMAIL__OR_MOBILE_ALREADY_REGISTERED:"User with this email or mobile number already exists",
  INVALID_USER:"Invalid email or password",
  USER_NOT_FOUND: 'User not found',
  REQUEST_SUCCESS: 'Request success',
  LOGIN_SUCCESSFULLY: 'Login successfully',
  INVALID_PASSWORD: 'Invalid password',
  INVALID_LOGIN_CREDS: 'Invalid credentials.',
  WRONG_OLD_PASSWORD: 'Invalid old password',
  INVALID_PASSWORD_FORMAT:
    'Password must contain at least one special character, one uppercase letter, one number, and be at least 8 characters long.',
  PASSWORD_SUCCESS: 'Password changed successfully',
  INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired reset token.',
  USER_ALREADY_EXIST:
    'An identity with the same email or contact number already exists.',
  INVALID_REQUEST: 'Invalid request',
  UNAUTHORIZED: 'Access token not valid',
  UNAUTHORIZED_USER:"Access denied: Admin role required.",
  AUTHORIZATION_HEADER_MISSING: "Authorization header missing",
};