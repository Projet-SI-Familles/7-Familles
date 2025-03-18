<?php

namespace App\Controller;

use App\Entity\Game;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class GameController extends AbstractController
{

    /**
     * Permet la création d'une partie à partir de son code de partie fournis par l'équipe d'organisation
     */
    #[Route('/api/game/create', name: 'create_game', methods: ['POST'])]
    public function createGame(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['codepartie'])) {
            return new JsonResponse(['error' => 'Le code de partie est requis'], 400);
        }

        $codepartie = (int) $data['codepartie'];

        $existingGame = $entityManager->getRepository(Game::class)->findOneBy(['codepartie' => $codepartie]);

        if ($existingGame) {
            return new JsonResponse([
                'error' => 'Une partie avec ce code existe déjà.'
            ], 409);
        }

        $game = new Game();
        $game->setCodepartie($codepartie);
        $game->setStartDate(new \DateTime('now', new \DateTimeZone('Europe/Paris')));
        $game->setEndDate(null);
        $game->setIswin(null);

        $entityManager->persist($game);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Partie créée avec succès',
            'game' => [
                'codepartie' => $game->getCodepartie(),
                'startDate' => $game->getStartDate()->format('c'),
                'endDate' => null,
                'iswin' => null
            ]
        ], 201);
    }



    /**
     * Permet d'update une partie si elle est gagnée ou perdue
     */
    #[Route('/api/games/update/{codepartie}', name: 'update_game_by_codepartie', methods: ['PATCH'])]
    public function updateGameByCodepartie(
        string $codepartie,
        Request $request,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $game = $entityManager->getRepository(Game::class)->findOneBy(['codepartie' => $codepartie]);

        if (!$game) {
            return new JsonResponse(['error' => 'Game not found'], 404);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['iswin'])) {
            $game->setIswin($data['iswin']);
        }
        if (isset($data['endDate'])) {
            $game->setEndDate(new \DateTime($data['endDate'], new \DateTimeZone('Europe/Paris')));
        }

        $entityManager->persist($game);
        $entityManager->flush();

        return new JsonResponse([
            'message' => 'Game updated successfully',
            'game' => [
                'codepartie' => $game->getCodepartie(),
                'iswin' => $game->getIswin(),
                'startDate' => $game->getStartDate()->format('c'),
                'endDate' => $game->getEndDate() ? $game->getEndDate()->format('c') : null
            ]
        ], 200);
    }
}
