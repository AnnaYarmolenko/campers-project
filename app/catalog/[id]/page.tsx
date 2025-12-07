"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCamperById } from "@/lib/api";
import FeaturesList from "@/components/FeaturesList/FeaturesList";
import type { Camper } from "@/types/camper";
import CamperCard from "@/components/CamperCard/CamperCard";
import iziToast from "izitoast";
import css from "./CamperDetailsPage.module.css";
import Loader from "@/components/Loader/Loader";

type Tab = "features" | "reviews";

export default function CamperDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("features");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCamperById(String(id));
        setCamper(data);
      } catch {
        setError("Failed to load camper");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const dateStr = formData.get("date") as string | null;

    if (!dateStr) {
      iziToast.error({
        title: "Error",
        message: "Please select booking date",
        position: "center",
        timeout: 3000,
      });
      return;
    }

    const selected = new Date(dateStr);
    const now = new Date();

    now.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected < now) {
      iziToast.error({
        title: "Error",
        message: "Booking date cannot be in the past",
        position: "center",
        timeout: 3000,
      });
      return;
    }

    iziToast.success({
      title: "Success",
      message: "Booking request sent successfully!",
      position: "center",
      timeout: 3000,
    });

    form.reset();
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!camper) return <p>Camper not found.</p>;

  const details = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ].filter((item) => item.value);

  const renderStars = (rating: number) => {
    const rounded = Math.round(rating);

    return Array.from({ length: 5 }, (_, i) => {
      const isFilled = i < rounded;

      return (
        <svg
          key={i}
          width="16"
          height="16"
          className={isFilled ? css.starFilled : css.starEmpty}
        >
          <use href="/sprite.svg#icon-rating" />
        </svg>
      );
    });
  };

  return (
    <main className={`container ${css.page}`}>
      <section className={css.topCard}>
        <CamperCard camper={camper} variant="details" />
      </section>

      {/* Вкладки */}
      <div className={css.tabs}>
        <button
          type="button"
          className={
            activeTab === "features"
              ? `${css.tabButton} ${css.tabButtonActive}`
              : css.tabButton
          }
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          className={
            activeTab === "reviews"
              ? `${css.tabButton} ${css.tabButtonActive}`
              : css.tabButton
          }
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Контент під вкладками */}
      <section className={css.contentRow}>
        <div className={css.leftCol}>
          {activeTab === "features" && (
            <div className={css.featuresBlock}>
              <FeaturesList camper={camper} />

              {/* Vehicle details */}
              <div className={css.detailsBlock}>
                <h3 className={css.detailsTitle}>Vehicle details</h3>
                <div className={css.detailsDivider}></div>

                <dl className={css.detailsList}>
                  {details.map((item) => (
                    <div key={item.label} className={css.detailRow}>
                      <dt className={css.detailLabel}>{item.label}</dt>
                      <dd className={css.detailValue}>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {/* Відгуки */}
          {activeTab === "reviews" && (
            <div className={css.reviewsBlock}>
              {camper.reviews && camper.reviews.length > 0 ? (
                camper.reviews.map((review) => (
                  <article
                    key={review.reviewer_name + review.comment}
                    className={css.reviewItem}
                  >
                    <div className={css.reviewHeader}>
                      <div className={css.reviewAvatar}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={css.reviewName}>{review.reviewer_name}</p>
                        <div className={css.reviewRating}>
                          {renderStars(review.reviewer_rating)}
                        </div>
                      </div>
                    </div>
                    <p className={css.reviewText}>{review.comment}</p>
                  </article>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Форма бронювання */}
        <aside className={css.rightCol}>
          <div className={css.bookingCard}>
            <h2 className={css.bookingTitle}>Book your campervan now</h2>
            <p className={css.bookingText}>
              Stay connected! We are always ready to help you.
            </p>

            <form onSubmit={handleBookingSubmit}>
              <div className={css.bookingField}>
                <input
                  name="name"
                  required
                  placeholder="Name*"
                  className={css.bookingInput}
                />
              </div>

              <div className={css.bookingField}>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email*"
                  className={css.bookingInput}
                />
              </div>

              <div className={css.bookingField}>
                <input
                  type="text"
                  name="date"
                  placeholder="Booking date*"
                  className={css.bookingInput}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  required
                />
              </div>

              <div className={css.bookingField}>
                <textarea
                  name="comment"
                  placeholder="Comment"
                  className={css.bookingTextarea}
                />
              </div>

              <button type="submit" className={`btnShow ${css.bookingButton}`}>
                Send
              </button>
            </form>
          </div>
        </aside>
      </section>
    </main>
  );
}
