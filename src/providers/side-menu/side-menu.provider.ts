import { Injectable } from "@angular/core";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { ProfileProvider } from "../profile/profile.provider";

@Injectable()
export class SideMenuProvider {

    dataPages = [
        { title: 'Leaderboards', page: 'LeaderboardsPage', icon: 'trophy' },
        { title: 'Heroes', page: 'HeroesPage', icon: 'contacts' },
        { title: 'Guides', page: 'GuidesPage', icon: 'school' },
        { title: 'FAQ', page: 'FaqPage', icon: 'help-circle' },
    ];

    strategyPages = [
        { title: 'Decks', page: 'DecksPage', icon: 'images' },
        { title: 'Cards', page: 'CardsPage', icon: 'image' },
        { title: 'Gems', page: 'GemsPage', icon: 'apps' },
    ];

    userPages = [
        { title: 'Profile', page: 'ProfilePage', icon: 'contact' },
        { title: 'Matches', page: 'MatchesPage', icon: 'game-controller-b' },
    ];


    private profile: EpicAccount;

    private availableMenus: any = {};

    constructor( private profileProvider: ProfileProvider ) {
        this.profile = this.profileProvider.getCachedProfile();
    }

    private buildMenus() {

        if ( this.profile !== false ) {
            this.availableMenus.userPages = this.userPages
        }

        this.availableMenus.strategyPages = this.strategyPages;

        this.availableMenus.dataPages = this.dataPages;
    }

    public getAvailableMenus() {
        this.buildMenus();
        return this.availableMenus;
    }

}