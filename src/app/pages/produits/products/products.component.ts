import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  product: any;
  productId: string = "";
  productsComplementaryInformation = [
    {
      name: "Blanc Noisette",
      ingredients: [
        "Farine de blé français",
        "chocolat blanc pâtissier",
        "noisettes bio",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
        "fruits à coques"
      ]
    },
    {
      name: "Cacahuète Gourmande",
      ingredients: [
        "Farine de blé français",
        "beurre de cacahuète (cacahuètes torréfiées, beurre de cacao, huile de tournesol, extrait de vanille)",
        "cacahuètes caramélisées",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
        "arachide"
      ]
    },
    {
      name: "Choco'Banane",
      ingredients: [
        "Farine de blé français",
        "chocolat au lait pâtissier",
        "banane déshydratées (100% fruits)",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Choco'Blanc Fondant",
      ingredients: [
        "Farine de blé français",
        "chocolat blanc pâtissier",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait"
      ]
    },
    {
      name: "Choco'Color",
      ingredients: [
        "Farine de blé français",
        "m&m's chocolat",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Choco'Lait",
      ingredients: [
        "Farine de blé français",
        "chocolat au lait pâtissier",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Choco'Noir",
      ingredients: [
        "Farine de blé français",
        "chocolat noir pâtissier",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Choco’Plaisir",
      ingredients: [
        "Farine de blé français",
        "chocolat au lait pâtissier",
        "pâte à tartiner chocolat noisette BIO (sans huile de palme)",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
        "fruits à coques",
        "soja"
      ]
    },
    {
      name: "Crousti'Coco",
      ingredients: [
        "Farine de blé français",
        "cubes de noix de coco déshydratés",
        "copeaux de noix de coco",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Delice'Papaye",
      ingredients: [
        "Farine de blé français",
        "cubes de papaye déshydratés",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Fraisi'croq",
      ingredients: [
        "Farine de blé français",
        "fraises déshydratées",
        "arôme de fraise bio",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Intense Choco",
      ingredients: [
        "Farine de blé français",
        "chocolat noir pâtissier",
        "poudre de cacao non sucré 70% de cacao",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
      ]
    },
    {
      name: "Kinder Fusion",
      ingredients: [
        "Farine de blé français",
        "chocolat kinder maxi (Chocolat au lait, sucre, lait, huile de palme, beurre)",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
        "soja"
      ]
    },
    {
      name: "Triple Choco",
      ingredients: [
        "Farine de blé français",
        "chocolat blanc pâtissier",
        "chocolat au lait pâtissier",
        "chocolat noir pâtissier",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait"
      ]
    },
    {
      name: "Éclat de Praline",
      ingredients: [
        "Farine de blé français",
        "chocolat blanc pâtissier",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)",
        "Praline Rose de lyon (sucre, amande, sirop de glucose, amidon de manioc, agent de brillance : huile végétale, colorant)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
        "fruits à coques (Amandes)"
      ]
    },
    {
      name: "Pécan'Délice",
      ingredients: [
        "Farine de blé français",
        "chocolat blanc pâtissier",
        "cassonade",
        "œufs",
        "levure alsacienne",
        "beurre de Vendée (lait 100% français)",
        "noix de pécan",
        "Caramel au beurre salé français (sucre, crème fraîche, beurre au sel de guérande, miel)"
      ],
      allergens: [
        "Gluten",
        "œufs",
        "lait",
        "fruits à coques (Noix)"
      ]
    },
    {
      name: "Chaud'Colat (Lot de 2)",
      ingredients: [
        "Chocolat de couverture au lait à partir de fève de cacao de qualité supérieur (Pâte de cacao, beurre de cacao, LACTOSE, LAIT écrémé en poudre,sucre, extrait de malt d'orge, émulsifiant (lécithine de SOJA))",
        "Cacao : 37% min, dont beurre de cacao : 32%. Matière sèche de LAIT : 18%",
        "Poudre de cacao à 70%, mini marshmallows (sirop de glucose fructose, sucres, eau, gélatine, protéines de lait, arôme, dextrose)."
      ],
      allergens: [
        "Soja",
        "lait"
      ]
    },
    {
      name: "Écrin des Fêtes (9 pièces)",
      ingredients: [
        "Chocolat de couverture au lait à partir de fève de cacao de qualité supérieur (Pâte de cacao, beurre de cacao, LACTOSE, LAIT écrémé en poudre,sucre, extrait de malt d'orge, émulsifiant (lécithine de SOJA), arôme (vanilline).)",
        "Cacao : 37% min, dont beurre de cacao : 32%. Matière sèche de LAIT : 18%",
        "Chocolat de couverture noir à partir de fève de cacao de qualité supérieur (Pâte de cacao, beurre de cacao, Sucre, émulsifiant (lécithine de SOJA))",
        "Cacao : 52% min, dont beurre de cacao 35%.",
        "Chocolat de couverture blanc (Sucre, beurre de cacao, poudre de LAIT entier, émulsifiant : lécithine de SOJA, arôme naturel de vanille.",
        "Caramel au beurre salé, noisettes, beurre de cacahuète, cacahuètes caramélisées."
      ],
      allergens: [
        "Soja",
        "lait",
        "noix et arachide"
      ]
    }
  ]


  input: { name: string, ingredients: string[]; allergens: string[] } | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id")!;

    if (this.productService.products) {
      this.product = this.productService.products.find((product: any) => product.id === this.productId);

      this.input = this.productsComplementaryInformation.find((stateProducts) => stateProducts.name === this.product.name) || null;
    }
  }
}
