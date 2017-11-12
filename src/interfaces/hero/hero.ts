import { Ability } from "./ability.interface";

export interface Hero {
    abilities?: Ability[];
    affinity1: string;
    affinity2: string;
    attack: string;
    code: string;
    damageType: string;
    icon: string;
    id: string;
    name: string;
    slug: string;
    type: string;
    affinity1Icon?: string;
    affinity2Icon?: string;
}