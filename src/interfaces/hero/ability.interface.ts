export interface Ability {

    icon: string;
    maxLevel: number;
    modifiersByLevel: any[];
    name: string;
    description: string;
    shortDescription: string;
    type: string;
    iconUrl?: string;
    cooldown? : number;
}
