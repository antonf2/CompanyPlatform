import {HiOutlineViewGrid, HiCog, HiBookOpen, HiClipboardList} from 'react-icons/hi'

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