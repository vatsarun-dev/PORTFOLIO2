export interface GoogleProfileEmail {
  value: string;
  verified?: boolean;
}

export interface GoogleProfilePhoto {
  value: string;
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: GoogleProfileEmail[];
  photos?: GoogleProfilePhoto[];
  provider: string;
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends GoogleProfile {}
  }
}
