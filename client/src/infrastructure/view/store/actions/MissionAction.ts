export type Action =
  | { type: 'display-list-missions' }
  | { type: 'display-mission' }
  | { type: 'update-mission' }
  | { type: 'add-mission' }
  | { type: 'delete-mission' };
