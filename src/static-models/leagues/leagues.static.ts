import { League } from "../../interfaces/league/league.interface";

let leagues : League[] = [
    {
        name: 'Bronze',
        iconName: 'bronze',
        rangeStart: '0',
        rangeEnd: '1099'
    },
    {
        name: 'Silver',
        iconName: 'silver',
        rangeStart: '1100',
        rangeEnd: '1299'
    },
    {
        name: 'Gold',
        iconName: 'gold',
        rangeStart: '1300',
        rangeEnd: '1499'
    },
    {
        name: 'Platinum',
        iconName: 'platinum',
        rangeStart: '1500',
        rangeEnd: '1699'
    },
    {
        name: 'Diamond',
        iconName: 'diamond',
        rangeStart: '1700+'
    },
    {
        name: 'Master',
        iconName: 'master',
        rangeStart: '2200+ (Maximum of 100 players)'
    },

];

export const LEAGUES = leagues;