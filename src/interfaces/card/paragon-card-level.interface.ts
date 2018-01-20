import { ParagonCardAbility } from "./paragon-card-ability.interface";
export interface ParagonCardLevel {
    level: number,
    levelImage: string;
    abilities: ParagonCardAbility[];

    attackSpeed?: number,
    basicArmor?: number,
    power? :number;
    manaRegen? :number;
    health? : number;
    abilityArmor? : number;
    healthRegen? :number;
}