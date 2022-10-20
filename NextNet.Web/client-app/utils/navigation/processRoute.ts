export const processRoutes = (userPermissions: string[]) => {
    const routes = [
        {
            name: 'Configuración de almacenamiento',
            href: '/almacenamiento/solidos',
            current: false,
            permissions: ['read-capacidades']
        },
        {
            name: 'Planilla mayor', 
            href: '/planillamayor', 
            current: false,
            permissions: ['read-gas-secado', 'read-planilla-mayor']
        }
    ];

    return routes.filter(route => route.permissions.some(routePermission => userPermissions.includes(routePermission))).map(route => route);

};