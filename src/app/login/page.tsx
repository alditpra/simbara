import { verifySession } from '@/lib/session';
import { redirect } from 'next/navigation';
import LoginForm from './form';

export default async function LoginPage() {
    const session = await verifySession();

    if (session) {
        redirect('/admin/dashboard');
    }

    return <LoginForm />;
}
