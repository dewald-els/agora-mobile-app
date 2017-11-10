import { PvpStats } from "./pvp-stats.interface";
import { TotalStats } from "./total-stats.interface";

export interface LifetimeStats {
    pvp: PvpStats;
    total: TotalStats;
}