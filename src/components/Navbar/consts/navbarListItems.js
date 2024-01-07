import RestaurantIcon from '@mui/icons-material/Restaurant'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SettingsIcon from '@mui/icons-material/Settings'

export const mainNavbarItems = [
    {
        id: 0,
        icon: <FitnessCenterIcon />,
        label: 'Fitness',
        route: 'fitness',
    },
    {
        id: 1,
        icon: <AutoStoriesIcon />,
        label: 'Quotes',
        route: 'quotes',
    },
    {
        id: 2,
        icon: <RestaurantIcon />,
        label: 'Nutrition',
        route: 'nutrition',
    },
    {
        id: 3,
        icon: <SettingsIcon />,
        label: 'Settings',
        route: 'settings',
    },
]
