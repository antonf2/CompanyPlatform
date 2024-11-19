import {HiOutlineViewGrid, HiCog, HiLogout, HiBookOpen, HiClipboardList} from 'react-icons/hi'

export const SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'wiki',
        label: 'Wiki',
        path: '/wiki',
        icon: <HiBookOpen />,
    },
    {
        key: 'inventory',
        label: 'Inventory',
        path: '/inventory',
        icon: <HiClipboardList />,
    },
    {
        key: 'management',
        label: 'Management',
        path: '/management',
        icon: <HiCog />,
    },
]

export const SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'logout',
        label: 'Logout',
        path: '/login',
        icon: <HiLogout />,
    }
]

// {
//     key: '',
//     label: '',
//     path: '',
//     icon: ,
// }