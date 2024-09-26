import { Routes } from '@angular/router';
import { TarkovComponent } from './pages/tarkov/tarkov.component';
import { TarkovIndexComponent } from './pages/tarkov/index/index.component';
import { TarkovProfilComponent } from './pages/tarkov/profil/profil.component';
import { TarkovShopComponent } from './pages/tarkov/shop/shop.component';
import { CookiesComponent} from './pages/cookies/cookies.component';
import { CookiesIndexComponent } from './pages/cookies/index/index.component';
import { CookiesShopComponent } from './pages/cookies/shop/shop.component';
import { CookiesGalerieComponent } from './pages/cookies/galerie/galerie.component';
import { HomeComponent } from './pages/home/home.component';
import { CgvComponent } from './pages/cgv/cgv.component';
import { LivraisonComponent } from './pages/livraison/livraison.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfilComponent } from './pages/profil/profil.component';


export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "tarkov",
        component: TarkovComponent,
        children: [
            {
                path: "",
                component: TarkovIndexComponent
            },
            {
                path: "profil",
                component: TarkovProfilComponent
            },
            {
                path: "boutique",
                component: TarkovShopComponent
            }
        ]
    },
    { 
        path: "cookies",
        component: CookiesComponent,
        children: [
            {
                path:"",
                component: CookiesIndexComponent
            },
            {
                path:"boutique",
                component: CookiesShopComponent
            },
            {
                path:"galerie",
                component: CookiesGalerieComponent
            }
        ]
    },
    {
        path: "cgv",
        component: CgvComponent,
        children: [
            
        ]
    },
    {
        path: "livraison",
        component: LivraisonComponent,
        children: [
            
        ]
    },
    {
        path: "contact",
        component: ContactComponent,
        children: [
            
        ]
    },
    {
        path: "profil",
        component: ProfilComponent,
        children: [
            
        ]
    }
];
