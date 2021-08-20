import { accountService } from '@/service.js';
import { router } from '@/routes';

export function authGuard(to) {
    const account = accountService.accountDetails;
    if (account && account.isLoggedIn) {
        return true;
    }
    router.push({ path: '/login', query: { returnUrl: to.fullPath } });
    return false;
}