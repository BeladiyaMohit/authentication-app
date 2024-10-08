import { logOut } from '@/action/auth-action';
import '../globals.css';

export const metadata = {
    title: 'Next Auth',
    description: 'Next.js Authentication',
};

export default function AuthRootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header id="auth-header">
                <p>Welcome back!</p>
                <form action={logOut}>
                    <button >Logout</button>
                </form>
            </header>
            {children}
        </>
    );
}