import { Component, Input, OnInit } from "@angular/core";
import { Match } from "../../interfaces/match/match.interface";
import { Hero } from "../../interfaces/hero/hero";
import { MatchTeamPlayer } from "../../interfaces/match/match-team-player.interface";
import { StatsProvider } from "../../providers/stats/stats.provider";

@Component({
    selector: 'match-history-item',
    templateUrl: 'match-history-item.component.html'
})
export class MatchHistoryItemComponent implements OnInit {

    @Input() inMatch: Match;
    @Input() inHeroes: Array<Hero>;
    @Input() inProfileId: string;
    private match: Match;
    private heroes: Array<Hero>;
    private profileTeamPlayer: MatchTeamPlayer;
    private profileTeamPlayerIndex: number = 0;
    private profileTeamTotalKills: number = 0;

    constructor( private statsProvider: StatsProvider ) {
    }

    ngOnInit(): void {
        this.match = this.inMatch;
        this.heroes = this.inHeroes;
        this.setTeamPlayerHero();
    }

    private setTeamPlayerHero() {


        let index = 0;
        this.match.teams.forEach(( team ) => {

            team.forEach(( teamPlayer: MatchTeamPlayer ) => {

                teamPlayer.heroData = this.heroes.find(( hero: Hero ) => {
                    return teamPlayer.hero == hero.code
                });

                if ( teamPlayer.id === this.inProfileId ) {
                    this.profileTeamPlayerIndex = index;
                    this.profileTeamPlayer = teamPlayer;
                }
            });
            index++;
        });


        this.match.teams[ this.profileTeamPlayerIndex ].forEach(( player: MatchTeamPlayer ) => {
            this.profileTeamTotalKills += player.kills;
        });

        console.log(this.profileTeamPlayer.kills + this.profileTeamPlayer.assists);
        console.log(this.profileTeamTotalKills);


        this.profileTeamPlayer.kdaRatio = this.statsProvider.getKDARatio(this.profileTeamPlayer.kills, this.profileTeamPlayer.assists, this.profileTeamPlayer.deaths);
        this.profileTeamPlayer.killParticipation = this.statsProvider.getRatio(this.profileTeamPlayer.kills + this.profileTeamPlayer.assists, this.profileTeamTotalKills) * 100;

    }
}