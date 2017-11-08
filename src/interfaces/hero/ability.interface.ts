export interface Ability {

    description: string;
    icon: string;
    maxLevel: number;
    modifiersByLevel: Array;
    name: string;
    shortDescription: string;
    type: string;
    iconUrl?: string;
}