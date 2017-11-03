import { PlayerStats } from "../player-stats/player-stats.interface";
import { LEAGUE } from "../../static-models/leagues/leagues.static";

export class PlayerProfile {
    id: number;
    name: string;
    donationTier: number;
    biography: string;
    twitchHandle: string;
    privacyEnabled: boolean;
    donationBadgeEnabled: boolean;
    accountGuid: string;
    avatar: string;
    stats: Array<PlayerStats>;

    constructor( profile?: PlayerProfile ) {
        this.id = profile.id;
        this.name = profile.name;
        this.donationTier = profile.donationTier;
        this.biography = profile.biography;
        this.twitchHandle = profile.twitchHandle;
        this.privacyEnabled = profile.privacyEnabled;
        this.donationBadgeEnabled = profile.donationBadgeEnabled;
        this.accountGuid = profile.accountGuid;
        this.avatar = profile.avatar;
        this.stats = profile.stats;
    }

    /**
     * Get the current ELO with 2 decimal places.
     * @returns {string}
     */
    getElo(): string {
        return this.stats[ 0 ].elo.toFixed(2);
    }

    /**
     * Get the players ELO
     * @returns {LEAGUE}
     */
    calculateProfileLeague() {
        if ( this.stats[ 0 ].elo <= 1099 ) {
            return LEAGUE.BRONZE;
        } else if ( this.stats[ 0 ].elo >= 1100 && this.stats[ 0 ].elo <= 1299 ) {
            return LEAGUE.SILVER;
        } else if ( this.stats[ 0 ].elo >= 1300 && this.stats[ 0 ].elo <= 1499 ) {
            return LEAGUE.GOLD;
        } else if ( this.stats[ 0 ].elo >= 1500 && this.stats[ 0 ].elo <= 1699 ) {
            return LEAGUE.PLATINUM;
        } else if ( this.stats[ 0 ].elo >= 1700 && this.stats[ 0 ].elo < 2200 ) {
            return LEAGUE.DIAMOND;
        } else if ( this.stats[ 0 ].elo >= 2200 ) {
            return LEAGUE.MASTER;
        } else {
            return LEAGUE.NONE;
        }
    }

}