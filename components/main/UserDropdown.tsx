"use client";

import { UserCircle, User, HelpCircle } from "lucide-react";
import Link from "next/link";
import { DropdownMenu } from "@/src/ui/DropdownMenu";
import LogoutButton from "@/src/ui/LogoutButton";

interface UserDropdownProps {
    session: {
        id: number;
        email: string;
        isProfileComplete: boolean | null;
        role: string;
    } | null;
}


export const UserDropdown = ({ session }: UserDropdownProps) => {

    if (!session) return null;

    const getProfilePath = () => {
        switch (session.role) {
            case "owner":
                return `/owner/${session.id}`;
            default:
                return `/${session.id}`;
        }
    };

    return (
        <DropdownMenu
            trigger={
                <button
                    className="group relative p-2 rounded-2xl transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    aria-label="Menú de usuario"
                >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <UserCircle
                            size={20}
                            className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                        />
                    </div>
                </button>
            }
        >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {session.email}
                    </p>
                </div>


                <div className="py-1">
                    <Link
                        href={getProfilePath()}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <User className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                        Mi perfil
                    </Link>



                    <Link
                        href="/help"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                        <HelpCircle className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
                        Ayuda
                    </Link>
                </div>

                <LogoutButton />
            </div>
        </DropdownMenu>
    );
};
