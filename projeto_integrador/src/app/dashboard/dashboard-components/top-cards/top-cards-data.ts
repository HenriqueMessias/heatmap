export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-bandaid',
        title: '21k',
        subtitle: 'Recuperados (SP)'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-hospital',
        title: '1k',
        subtitle: 'Hospitalizados (SP)'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-capsule',
        title: '456',
        subtitle: 'Medicados (SP)'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-shield-plus',
        title: '210',
        subtitle: 'Não Reagentes (SP)'
    },

]
