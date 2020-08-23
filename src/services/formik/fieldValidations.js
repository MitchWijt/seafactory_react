export const validateEmail = (email) => {
    const errors = {};
    if (!email) {
        errors.email = 'Email is required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
}