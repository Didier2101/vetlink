export interface Session {
    id: number;
    email: string;
    role: string;
    isProfileComplete: boolean | null;
}