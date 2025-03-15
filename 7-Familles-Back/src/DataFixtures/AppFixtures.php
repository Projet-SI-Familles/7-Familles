<?php
namespace App\DataFixtures;

use App\Entity\Family;
use App\Entity\Game;
use App\Entity\RawMaterial;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
public function load(ObjectManager $manager): void
{
    // Insertion des familles
    $family1 = new Family();
    $family1->setName('Actifs');
    $family1->setDescription('Donne les propriétés bénéfiques au produit cosmétique : hydratant, nourrissant, amincissant');
    $manager->persist($family1);

    $family2 = new Family();
    $family2->setName('Texturants');
    $family2->setDescription('Donne la texture particulière au produit : léger, visqueux, épais, mousse');
    $manager->persist($family2);

    $family3 = new Family();
    $family3->setName('Colorants');
    $family3->setDescription('Colorant = colore le produit / pigment = colore la peau, les cheveux…');
    $manager->persist($family3);

    $family4 = new Family();
    $family4->setName('Conservateur');
    $family4->setDescription('Protège le produit des microbes');
    $manager->persist($family4);

    $family5 = new Family();
    $family5->setName('Emulsifiant');
    $family5->setDescription('Permet de lier les phases grasse et aqueuse entre elles');
    $manager->persist($family5);

    $family6 = new Family();
    $family6->setName('Phase aqueuse');
    $family6->setDescription('Constituée essentiellement d’eau. Entrant dans la composition d’un produit cosmétique afin d’hydrater la peau');
    $manager->persist($family6);

    $family7 = new Family();
    $family7->setName('Phase grasse');
    $family7->setDescription('Constituée essentiellement de composés huileux. Entrant dans la composition d’un produit cosmétique afin de protéger la peau des agressions extérieures');
    $manager->persist($family7);

    // Insertion des matières premières
    $prefix_img = "/img/composants/";
    $rawMaterial14 = new RawMaterial();
    $rawMaterial14->setName('Cire d\'abeille');
    $rawMaterial14->setDescription('Epaississant');
    $rawMaterial14->setImage($prefix_img . "cire-abeille.png");
    $rawMaterial14->setFamily($family2);
    $manager->persist($rawMaterial14);

    $rawMaterial15 = new RawMaterial();
    $rawMaterial15->setName('Gomme xanthane');
    $rawMaterial15->setDescription('Permet d’épaissir et gélifier un produit');
    $rawMaterial15->setImage($prefix_img . "gomme-xanthane.png");
    $rawMaterial15->setFamily($family2);
    $manager->persist($rawMaterial15);

    $rawMaterial1 = new RawMaterial();
    $rawMaterial1->setName('Huile végétale');
    $rawMaterial1->setDescription('Corps gras extrait d’une plante oléagineuse');
    $rawMaterial1->setImage($prefix_img . "huile-vegetale.webp");
    $rawMaterial1->setFamily($family7);
    $manager->persist($rawMaterial1);

    $rawMaterial2 = new RawMaterial();
    $rawMaterial2->setName('Beurre de karité');
    $rawMaterial2->setDescription('Corps gras extrait des fruits de Karité');
    $rawMaterial2->setImage($prefix_img . "beurre-karité.png");
    $rawMaterial2->setFamily($family7);
    $manager->persist($rawMaterial2);

    $rawMaterial16 = new RawMaterial();
    $rawMaterial16->setName('Gomme guar');
    $rawMaterial16->setDescription('Permet de gélifier un produit');
    $rawMaterial16->setImage($prefix_img . "gomme-guar.png");
    $rawMaterial16->setFamily($family2);
    $manager->persist($rawMaterial16);

    $rawMaterial3 = new RawMaterial();
    $rawMaterial3->setName('Caféine');
    $rawMaterial3->setDescription('Permet de raffermir la peau');
    $rawMaterial3->setImage($prefix_img . "cafeine.png");
    $rawMaterial3->setFamily($family1);
    $manager->persist($rawMaterial3);

    $rawMaterial4 = new RawMaterial();
    $rawMaterial4->setName('Vitamine E');
    $rawMaterial4->setDescription('Agit contre le vieillissement de la peau');
    $rawMaterial4->setImage($prefix_img . "vitamine-e.webp");
    $rawMaterial4->setFamily($family1);
    $manager->persist($rawMaterial4);

    $rawMaterial5 = new RawMaterial();
    $rawMaterial5->setName('Allantoïne');
    $rawMaterial5->setDescription('Permet de réparer la peau et de la rendre plus douce');
    $rawMaterial5->setImage($prefix_img . "allantoïne.png");
    $rawMaterial5->setFamily($family1);
    $manager->persist($rawMaterial5);

    $rawMaterial6 = new RawMaterial();
    $rawMaterial6->setName('Glycérine');
    $rawMaterial6->setDescription('Agent hydratant');
    $rawMaterial6->setImage($prefix_img . "glycérine.webp");
    $rawMaterial6->setFamily($family6);
    $manager->persist($rawMaterial6);

    $rawMaterial7 = new RawMaterial();
    $rawMaterial7->setName('Eau minérale');
    $rawMaterial7->setDescription('Eau d’origine souterraine');
    $rawMaterial7->setImage($prefix_img . "eau-minérale.png");
    $rawMaterial7->setFamily($family6);
    $manager->persist($rawMaterial7);

    $rawMaterial8 = new RawMaterial();
    $rawMaterial8->setName('Hydrolat');
    $rawMaterial8->setDescription('Produit aqueux');
    $rawMaterial8->setImage($prefix_img . "hydrolat.png");
    $rawMaterial8->setFamily($family6);
    $manager->persist($rawMaterial8);

    $rawMaterial9 = new RawMaterial();
    $rawMaterial9->setName('Lécithine');
    $rawMaterial9->setDescription('Permet de mélanger eau et huile à froid');
    $rawMaterial9->setImage($prefix_img . "lécithine.png");
    $rawMaterial9->setFamily($family5);
    $manager->persist($rawMaterial9);

    $rawMaterial10 = new RawMaterial();
    $rawMaterial10->setName('Cosgard');
    $rawMaterial10->setDescription('Évite le développement des bactéries');
    $rawMaterial10->setImage($prefix_img . "cosgard.webp");
    $rawMaterial10->setFamily($family4);
    $manager->persist($rawMaterial10);

    $rawMaterial11 = new RawMaterial();
    $rawMaterial11->setName('Extrait de pépins de pamplemousse');
    $rawMaterial11->setDescription('Évite le développement des bactéries');
    $rawMaterial11->setImage($prefix_img . "extrait-de-pépins-de-pamplemousse.png");
    $rawMaterial11->setFamily($family4);
    $manager->persist($rawMaterial11);

    $rawMaterial12 = new RawMaterial();
    $rawMaterial12->setName('Poudre de Mica');
    $rawMaterial12->setDescription('Apporte de la couleur à un produit');
    $rawMaterial12->setImage($prefix_img . "poudre-de-mica.jpg");
    $rawMaterial12->setFamily($family3);
    $manager->persist($rawMaterial12);

    $rawMaterial13 = new RawMaterial();
    $rawMaterial13->setName('Oxyde noir');
    $rawMaterial13->setDescription('Fonce la teinte d’un produit');
    $rawMaterial13->setImage($prefix_img . "oxyde-noir.png");
    $rawMaterial13->setFamily($family3);
    $manager->persist($rawMaterial13);

    // Sauvegarde de toutes les entités
    $manager->flush();
    }
}
?>