<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity]
#[ORM\Table(name: "family")]
class Family
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $idfamily = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'family', targetEntity: Rawmaterial::class)]
    private Collection $Rawmaterials;

    public function __construct()
    {
        $this->Rawmaterials = new ArrayCollection();
    }

    public function getIdfamily(): ?int
    {
        return $this->idfamily;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getRawmaterials(): Collection
    {
        return $this->Rawmaterials;
    }

    public function addRawmaterial(Rawmaterial $rawmaterial): static
    {
        if (!$this->Rawmaterials->contains($rawmaterial)) {
            $this->Rawmaterials->add($rawmaterial);
            $rawmaterial->setFamily($this);
        }
        return $this;
    }

    public function removeRawmaterial(Rawmaterial $rawmaterial): static
    {
        if ($this->Rawmaterials->removeElement($rawmaterial)) {
            if ($rawmaterial->getFamily() === $this) {
                $rawmaterial->setFamily(null);
            }
        }
        return $this;
    }
}