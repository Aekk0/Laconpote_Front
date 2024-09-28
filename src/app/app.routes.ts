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
import { BlancnoisetteComponent } from './pages/produits/blancnoisette/blancnoisette.component';
import { CacahuetegourmandeComponent } from './pages/produits/cacahuetegourmande/cacahuetegourmande.component';
import { ChocobananeComponent } from './pages/produits/chocobanane/chocobanane.component';
import { ChocoblancComponent } from './pages/produits/chocoblanc/chocoblanc.component';
import { ChococolorComponent } from './pages/produits/chococolor/chococolor.component';
import { ChocolaitComponent } from './pages/produits/chocolait/chocolait.component';
import { ChoconoirComponent } from './pages/produits/choconoir/choconoir.component';
import { ChocoplaisirComponent } from './pages/produits/chocoplaisir/chocoplaisir.component';
import { CrousticocoComponent } from './pages/produits/crousticoco/crousticoco.component';
import { FraisicroqComponent } from './pages/produits/fraisicroq/fraisicroq.component';
import { IntensechocoComponent } from './pages/produits/intensechoco/intensechoco.component';
import { KinderfusionComponent } from './pages/produits/kinderfusion/kinderfusion.component';
import { TriplechocoComponent } from './pages/produits/triplechoco/triplechoco.component';
import { BasketComponent } from './pages/basket/basket/basket.component';

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
            },
            {
              path: "basket",
              component: BasketComponent
            }
        ]
    },
    {
        path: "cgv",
        component: CgvComponent
    },
    {
        path: "livraison",
        component: LivraisonComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "profil",
        component: ProfilComponent
    },
    {
        path: "blancnoisette",
        component: BlancnoisetteComponent
    },
    {
        path: "cacahuetegourmande",
        component: CacahuetegourmandeComponent
    },
    {
        path: "chocobanane",
        component: ChocobananeComponent
    },
    {
        path: "chocoblanc",
        component: ChocoblancComponent
    },
    {
        path: "chococolor",
        component: ChococolorComponent
    },
    {
        path: "chocolait",
        component: ChocolaitComponent
    },
    {
        path: "choconoir",
        component: ChoconoirComponent
    },
    {
        path: "chocoplaisir",
        component: ChocoplaisirComponent
    },
    {
        path: "croustichoco",
        component: CrousticocoComponent
    },
    {
        path: "fraisicroq",
        component: FraisicroqComponent
    },
    {
        path: "intensechoco",
        component: IntensechocoComponent
    },
    {
        path: "kinderfusion",
        component: KinderfusionComponent
    },
    {
        path: "triplechoco",
        component: TriplechocoComponent
    }
];
