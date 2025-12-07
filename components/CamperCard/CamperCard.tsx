"use client";

import Link from "next/link";
import Image from "next/image";
import { Camper } from "@/types/camper";
import { useFavoritesStore } from "@/lib/store/favorites";
import FeaturesList from "@/components/FeaturesList/FeaturesList";
import css from "./CamperCard.module.css";

interface Props {
  camper: Camper;
  variant?: "catalog" | "details";
}

export default function CamperCard({ camper, variant = "catalog" }: Props) {
  const isDetails = variant === "details";

  const favorite = useFavoritesStore((state) => state.isFavorite(camper.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const images = camper.gallery || [];
  const reviewsCount = camper.reviews?.length || 0;

  // Варіант для сторінки деталей
  if (isDetails) {
    return (
      <article className={`${css.card} ${css.cardDetails}`}>
        <div className={css.detailsHeader}>
          <h2 className={css.title}>{camper.name}</h2>

          <div className={css.stats}>
            <div className={css.rating}>
              <svg className={css.ratingIcon} width="15" height="14">
                <use href="/sprite.svg#icon-rating" />
              </svg>
              <span className={css.underline}>
                {camper.rating} ({reviewsCount} Reviews)
              </span>

              <span className={css.location}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-map" />
                </svg>
                {camper.location}
              </span>
            </div>
          </div>

          <p className={css.detailsPrice}>€{camper.price.toFixed(2)}</p>
        </div>

        {images.length > 0 && (
          <div className={css.gallery}>
            {images.map((img) => (
              <Image
                key={img.original}
                src={img.original}
                alt={camper.name}
                width={292}
                height={320}
                className={css.image}
              />
            ))}
          </div>
        )}

        <p className={css.descriptionFull}>{camper.description}</p>
      </article>
    );
  }

  // Варіант для каталогу
  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        {images[0] && (
          <Image
            src={images[0].thumb || images[0].original}
            alt={camper.name}
            width={292}
            height={320}
            className={css.image}
          />
        )}
      </div>

      <div className={css.content}>
        <div>
          <div className={css.header}>
            <h2 className={css.title}>{camper.name}</h2>

            <div>
              <span className={css.price}>€{camper.price.toFixed(2)}</span>

              <button
                type="button"
                onClick={() => toggleFavorite(camper)}
                aria-label="Toggle favorite"
                className={favorite ? css.favButtonActive : css.favButton}
              >
                <svg width="24" height="21" className={css.heartIcon}>
                  <use href="/sprite.svg#icon-heart" />
                </svg>
              </button>
            </div>
          </div>

          <div className={css.stats}>
            <div className={css.rating}>
              <svg  className={css.ratingIcon} width="15" height="14">
                <use href="/sprite.svg#icon-rating" />
              </svg>
              <div className={css.underline}>
                {camper.rating} <span>({reviewsCount} Reviews)</span>
              </div>

              <span className={css.location}>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-map" />
                </svg>
                {camper.location}
              </span>
            </div>
          </div>

          <p className={css.description}>{camper.description}</p>

          <FeaturesList camper={camper} />
        </div>

        <div className={css.showMore}>
          <Link href={`/catalog/${camper.id}`}>Show more</Link>
        </div>
      </div>
    </article>
  );
}
