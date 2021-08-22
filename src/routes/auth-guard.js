import { accountService } from '@/service.js';
import { router } from '@/routes';

export function authGuard(to) {
    if (accountService.isLoggedIn()) {
        return true;
    }
    router.push({ path: '/login', query: { returnUrl: to.fullPath } });
    return false;
}