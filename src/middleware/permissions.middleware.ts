import { claimCheck } from 'express-oauth2-jwt-bearer';

export const checkPermissions = (permissions: string[]) => {
    return claimCheck((claims: any) => {
        const multipleExist = permissions.every(value => {
            return claims.permissions.includes(value);
        });
        return multipleExist
    })
};