import { Component, ViewChild } from "@angular/core";
import { IonicPage, Nav, NavController } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'side-menu-page',
    templateUrl: './side-menu.html'
})
export class SideMenuPage {

    @ViewChild(Nav) nav: Nav;

    pages = [

        { title : 'Leaderboards', page: 'LeaderboardsPage', icon:'trophy'} ,
        { title : 'Heroes', page: 'HeroesPage', icon: 'contacts'} ,
        { title : 'Guides', page: 'GuidesPage', icon: 'school'} ,
        { title : 'FAQ', page: 'FaqPage', icon: 'help-circle'} ,
    ];

    matchEnhancementPages = [
        { title : 'Decks', page: 'DecksPage', icon: 'images'} ,
        { title : 'Cards', page: 'CardsPage', icon: 'image'} ,
        { title : 'Gems', page: 'GemsPage', icon: 'apps'} ,
    ];
    userPages = [
        { title : 'Profile', page: 'ProfilePage', icon: 'contact'} ,
        { title : 'Matches', page: 'MatchesPage', icon: 'game-controller-b' } ,
    ];

    rootPage : string = 'ProfilePage';

    constructor(){
    }

    openPage(page : string) {
        this.nav.setRoot(page);
    }
}