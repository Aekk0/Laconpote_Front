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
