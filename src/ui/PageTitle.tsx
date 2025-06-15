import { concert_one } from "../lib/fonts";


interface PageTitleProps {
    children: React.ReactNode;
    className?: string;
}

export default function PageTitle({ children, className = "" }: PageTitleProps) {
    return (
        <h2 className={`${concert_one.className} ${className} text-3xl font-bold  dark:text-white mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent`}>
            {children}
        </h2>
    );
}
