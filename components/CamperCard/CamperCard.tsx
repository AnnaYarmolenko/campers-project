"use client";

import Link from "next/link";
import Image from "next/image";
import { Camper } from "@/types/camper";
import { useFavoritesStore } from "@/lib/store/favorites";

interface Props {
  camper: Camper;
}

export default function CamperCard({ camper }: Props) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(camper.id);

  const mainImage = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original;

  return (
    <article>
      {mainImage && (
        <div>
          <Image src={mainImage} alt={camper.name} width={160} height={128} />
        </div>
      )}

      <div>
        <header>
          <h2>{camper.name}</h2>
          <div>
            <span>€{camper.price.toFixed(2)}</span>
            <button
              type="button"
              onClick={() => toggleFavorite(camper)}
              aria-label="Toggle favorite"
            >
              {favorite ? "♥" : "♡"}
            </button>
          </div>
        </header>

        <div>
          <span>Rating: {camper.rating}★</span> <span>{camper.location}</span>
        </div>

        <p>{camper.description}</p>

        <div>
          {camper.AC && <span>AC</span>}
          {camper.kitchen && <span>Kitchen</span>}
          {camper.bathroom && <span>Bathroom</span>}
          {camper.transmission && <span>{camper.transmission}</span>}
          {camper.engine && <span>{camper.engine}</span>}
        </div>

        <div>
          <Link href={`/catalog/${camper.id}`}>Show more</Link>
        </div>
      </div>
    </article>
  );
}
