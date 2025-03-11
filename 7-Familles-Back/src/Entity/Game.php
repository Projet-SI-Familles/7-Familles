<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity]
#[ORM\Table(name: "game")]
class Game
{
    #[ORM\Id]
    #[ORM\Column]
    #[ORM\GeneratedValue]
    private ?int $idgame = null;

    #[ORM\Column]
    private ?string $codepartie = null;

    #[ORM\Column(type: Types::BOOLEAN, nullable: true)]
    private ?bool $iswin = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTime $startDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTime $endDate = null;

    public function getCodepartie(): ?string
    {
        return $this->codepartie;
    }

    public function setCodepartie(?string $codepartie): static
    {
        $this->codepartie = $codepartie;
        return $this;
    }

    public function getIdgame(): ?int
    {
        return $this->idgame;
    }

    public function getIswin(): ?bool
    {
        return $this->iswin;
    }

    public function setIswin(?bool $iswin): static
    {
        $this->iswin = $iswin;
        return $this;
    }

    public function getStartDate(): ?\DateTime
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTime $startDate): static
    {
        $this->startDate = $startDate;
        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTime $endDate): static
    {
        $this->endDate = $endDate;
        return $this;
    }
}