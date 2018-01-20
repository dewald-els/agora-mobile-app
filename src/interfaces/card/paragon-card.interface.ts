import { ParagonCardLevel } from "./paragon-card-level.interface";
export interface ParagonCard {
    affinity: string;
    goldCost?: number;
    icon: string;
    id: string;
    levels: ParagonCardLevel[];
    name: string;
    health: number;
    level: number;
    levelImage: string;
    rarity: string;
    trait: string;
    imageUrl: string;
    agilityGemCost?: string;
    vitalityGemCost?: string;
    intellectGemCost?: string;
}

