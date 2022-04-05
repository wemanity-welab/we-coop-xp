const profileValidation = (profile: string) => {
  if (profile === undefined || profile === null || profile === '')
    return 'Le profil doit être renseigné';
  if (typeof profile !== 'string')
    return 'Le profil doit être une chaîne de caractères';
  if (profile.length < 2 || profile.length > 50)
    return 'Le profil doit contenir entre 2 et 50 caractères';
  return null;
};

const descriptionValidation = (description: string) => {
  if (description === null || description === undefined || description === '')
    return 'La description doit être renseignée';
  if (typeof description !== 'string')
    return 'La description doit être une chaîne de caractères';
  if (description.length < 15 || description.length > 500)
    return 'La description doit contenir entre 15 et 500 caractères';
  return null;
};

const missionValidator = (data: any) => {
  const { profil, description } = data;
  const errors = [];

  const profileError = profileValidation(profil);
  if (profileError) errors.push({ field: 'profil', message: profileError });

  const descriptionError = descriptionValidation(description);
  if (descriptionError)
    errors.push({ field: 'description', message: descriptionError });

  return errors.length > 0 ? errors : null;
};

export default missionValidator;
